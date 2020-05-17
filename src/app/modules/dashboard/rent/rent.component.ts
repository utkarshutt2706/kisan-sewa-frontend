import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

import { ShopService } from '../../core/services/shop.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { LoaderService } from '../../core/services/loader.service';

@Component({
    selector: 'app-rent',
    templateUrl: './rent.component.html',
    styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

    public itemsForRent = [];

    constructor(
        private shopService: ShopService,
        private dialog: MatDialog,
        private loaderService: LoaderService
    ) { }

    ngOnInit(): void {
        this.getItemsForRent();
    }

    private getItemsForRent() {
        this.loaderService.showLoader();
        this.shopService.getItemsForRent({}).subscribe(
            (list: any) => {
                this.loaderService.hideLoader();
                this.itemsForRent = list;
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
