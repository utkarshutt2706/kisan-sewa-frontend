import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoothComponent } from './booth/booth.component';
import { FarmerComponent } from './farmer/farmer.component';
import { SellerComponent } from './seller/seller.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
    {
        path: 'booth',
        component: BoothComponent
    },
    {
        path: 'farmer',
        component: FarmerComponent
    },
    {
        path: 'seller',
        component: SellerComponent
    },
    {
        path: 'shop',
        component: ShopComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
