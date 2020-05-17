import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ShopService } from '../../core/services/shop.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { LoaderService } from '../../core/services/loader.service';

@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

    public itemsForSale = [];

    constructor(
        private shopService: ShopService,
        private dialog: MatDialog,
        private loaderService: LoaderService
    ) { }

    ngOnInit(): void {
        this.getItemsForSale();
    }

    private getItemsForSale() {
        this.loaderService.showLoader();
        this.shopService.getItemsForSale({}).subscribe(
            (list: any) => {
                this.loaderService.hideLoader();
                this.itemsForSale = list;
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
