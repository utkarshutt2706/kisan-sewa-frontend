import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { StorageService } from '../../core/services/storage.service';
import { LoaderService } from '../../core/services/loader.service';
import { LocationComponent } from 'src/app/shared/location/location.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MiscellaneousService } from '../../core/services/miscellaneous.service';

@Component({
    selector: 'app-market-rates',
    templateUrl: './market-rates.component.html',
    styleUrls: ['./market-rates.component.scss']
})
export class MarketRatesComponent implements OnInit {

    public displayedColumns = ['sNo', 'name', 'localRate', 'avgRate'];
    public dataSource = new MatTableDataSource();

    constructor(
        private miscService: MiscellaneousService,
        private dialog: MatDialog,
        public storage: StorageService,
        private loaderService: LoaderService
    ) { }

    ngOnInit(): void {
        this.getLocation();
    }

    public getLocation() {
        const dialogRef = this.dialog.open(LocationComponent);
        dialogRef.afterClosed().subscribe(
            coords => {
                if (coords !== undefined && coords.lat !== undefined && coords.lon !== undefined) {
                    this.getMarketRate(coords);
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

    private getMarketRate(coords: any) {
        this.loaderService.showLoader();
        this.miscService.getMarketRate(coords).subscribe(
            (marketRates: any) => {
                this.loaderService.hideLoader();
                this.dataSource = new MatTableDataSource(marketRates);
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

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
