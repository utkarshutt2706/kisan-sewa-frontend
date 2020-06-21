import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../core/services/shop.service';
import { LoaderService } from '../../core/services/loader.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { StorageService } from '../../core/services/storage.service';

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
        private router: Router,
        private storage: StorageService
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
                        if (error.error.message === 'invalidUrl' || error.error.message === 'null') {
                            const currentLang = this.storage.getCurrentLang();
                            let message = 'No product found for given ID';
                            if (currentLang === 'hi') {
                                message = 'दी गई आईडी के लिए कोई उत्पाद नहीं मिला';
                            }
                            const dialogRef = this.dialog.open(ErrorDialogComponent, {
                                data: { message }
                            });
                            dialogRef.afterClosed().subscribe(
                                change => {
                                    this.router.navigateByUrl('/dashboard/shop');
                                }
                            );
                        } else {
                            const dialogRef = this.dialog.open(ErrorDialogComponent, {
                                data: error.error
                            });
                            dialogRef.afterClosed().subscribe(
                                change => {
                                    this.router.navigateByUrl('/dashboard/shop');
                                }
                            );
                        }
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
                        this.dialog.open(ErrorDialogComponent, {
                            data: error.error
                        });
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

    public viewSeller(id: string) {
        this.router.navigateByUrl(`/dashboard/seller/${id}`)
    }

}
