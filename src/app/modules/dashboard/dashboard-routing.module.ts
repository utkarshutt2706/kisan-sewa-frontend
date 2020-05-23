import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoothComponent } from './booth/booth.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateBoothComponent } from './update-booth/update-booth.component';

const routes: Routes = [
    {
        path: 'booth',
        component: BoothComponent
    },
    {
        path: 'booth/update',
        component: UpdateBoothComponent
    },
    {
        path: 'shop',
        component: ShopComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'user/update',
        component: UpdateUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
