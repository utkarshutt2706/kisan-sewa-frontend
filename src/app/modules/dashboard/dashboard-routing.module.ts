import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoothComponent } from './booth/booth.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: 'booth',
        component: BoothComponent
    },
    {
        path: 'user',
        component: UserComponent
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
