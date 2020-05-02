import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoothComponent } from './booth/booth.component';
import { FarmerComponent } from './farmer/farmer.component';
import { SellerComponent } from './seller/seller.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
