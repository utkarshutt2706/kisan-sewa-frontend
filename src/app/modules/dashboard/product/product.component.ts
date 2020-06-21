import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../core/services/shop.service';
import { LoaderService } from '../../core/services/loader.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    public product: any;

    constructor(
        private route: ActivatedRoute,
        private shopService: ShopService,
        private loaderService: LoaderService,
        private dialog: MatDialog,
        private router: Router
    ) { }

    ngOnInit(): void {
        const prodType = this.route.snapshot.params.type;
        const prodId = this.route.snapshot.params.id;
        this.getProduct(prodType, prodId);
    }

    private getProduct(prodType: string, prodId: string) {
        this.loaderService.showLoader();
        switch (prodType) {
            case 'sell':
                this.shopService.getItemForSaleById(prodId).subscribe(
                    product => {
                        this.product = product;
                        this.loaderService.hideLoader();
                    },
                    error => {
                        console.log(error);
                        this.loaderService.hideLoader();
                    },
                    () => { }
                );
                break;
            case 'rent':
                this.shopService.getItemForRentById(prodId).subscribe(
                    product => {
                        this.product = product;
                        this.loaderService.hideLoader();
                    },
                    error => {
                        console.log(error);
                        this.loaderService.hideLoader();
                    },
                    () => { }
                );
                break;
            default:
                this.loaderService.hideLoader();
                this.router.navigateByUrl('404');
                break;
        }
    }

}
