import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    @Input() products: any;
    @Input() productType: string;

    constructor(private router: Router) { }

    ngOnInit(): void {
        console.log(this.products);
    }

    public viewProduct(id: string) {
        this.router.navigateByUrl(`/dashboard/product/${this.productType}/${id}`);
    }

}
