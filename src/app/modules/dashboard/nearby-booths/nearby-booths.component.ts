import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { BoothService } from '../../core/services/booth.service';
import { LocationComponent } from 'src/app/shared/components/location/location.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { StorageService } from '../../core/services/storage.service';
import { LoaderService } from '../../core/services/loader.service';

@Component({
    selector: 'app-nearby-booths',
    templateUrl: './nearby-booths.component.html',
    styleUrls: ['./nearby-booths.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class NearbyBoothsComponent implements OnInit {

    public dataSource = new MatTableDataSource();
    public columnsToDisplay = ['sNo', 'name', 'dist'];
    public columnsToDisplay2 = ['sNo', 'details'];
    expandedElement: any;
    expandedElement2: any;
    private limit = 2;
    private lat: number;
    private lon: number;
    public viewMoreBtn = false;

    constructor(
        private boothService: BoothService,
        private dialog: MatDialog,
        public storage: StorageService,
        private loaderService: LoaderService
    ) { }

    ngOnInit(): void {
        this.getLocation();
    }

    public getLocation() {
        this.limit = 2;
        const dialogRef = this.dialog.open(LocationComponent);
        dialogRef.afterClosed().subscribe(
            coords => {
                if (coords !== undefined && coords.lat !== undefined && coords.lon !== undefined) {
                    this.lat = coords.lat;
                    this.lon = coords.lon;
                    this.getNearbyBooths(coords, this.limit);
                } else {
                    const currenLang = this.storage.getCurrentLang();
                    if (currenLang === 'hi') {
                        this.dialog.open(ErrorDialogComponent, {
                            data: { message: 'आपने मानचित्र पर कोई स्थान नहीं चुना है। कृपया चुने!' }
                        });
                    } else {
                        this.dialog.open(ErrorDialogComponent, {
                            data: { message: 'You have not choosen a location on the map. Please choose!' }
                        });
                    }
                }
            }
        )
    }

    private getNearbyBooths(coords: any, limitParam: number) {
        this.loaderService.showLoader();
        coords.limit = limitParam;
        this.boothService.getNearbyBooths(coords).subscribe(
            (nearbyBooths: any) => {
                this.loaderService.hideLoader();
                this.dataSource = new MatTableDataSource(nearbyBooths.booths);
                this.viewMoreBtn = nearbyBooths.viewMore;
            },
            error => {
                this.loaderService.hideLoader();
                this.dialog.open(ErrorDialogComponent, {
                    data: error.error
                });
            },
            () => { }
        );
    }

    public viewMore() {
        this.limit += 2;
        this.getNearbyBooths(
            { lat: this.lat, lon: this.lon }, this.limit
        );
    }

}
