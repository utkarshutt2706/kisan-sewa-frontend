import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StorageService } from '../../core/services/storage.service';
import { LoaderService } from '../../core/services/loader.service';
import { LocationComponent } from 'src/app/shared/location/location.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MiscellaneousService } from '../../core/services/miscellaneous.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

    public weather: any;
    public dataSource: any;
    public columnsToDisplay = ['sNo', 'details'];
    expandedElement: any;

    constructor(
        private dialog: MatDialog,
        public storage: StorageService,
        private loaderService: LoaderService,
        private miscService: MiscellaneousService
    ) { }

    ngOnInit(): void {
        this.getLocation();
    }

    public getLocation() {
        const dialogRef = this.dialog.open(LocationComponent);
        dialogRef.afterClosed().subscribe(
            coords => {
                if (coords !== undefined && coords.lat !== undefined && coords.lon !== undefined) {
                    this.getWeather(coords);
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

    private getWeather(coords: any) {
        this.loaderService.showLoader();
        this.miscService.getWeather(coords).subscribe(
            (data: any) => {
                this.loaderService.hideLoader();
                this.weather = JSON.parse(data);
                console.log(this.weather);
                this.dataSource = new MatTableDataSource(this.weather.forecasts);
                console.log(this.dataSource)
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

}
