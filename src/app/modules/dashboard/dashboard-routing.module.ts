import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoothComponent } from './booth/booth.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateBoothComponent } from './update-booth/update-booth.component';
import { ProductComponent } from './product/product.component';
import { BoothGuard } from 'src/app/modules/core/guards/booth.guard';
import { UserGuard } from 'src/app/modules/core/guards/user.guard';
import { AuthGuard } from 'src/app/modules/core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'booth',
        component: BoothComponent,
        canActivate: [BoothGuard]
    },
    {
        path: 'booth/update',
        component: UpdateBoothComponent,
        canActivate: [BoothGuard]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [UserGuard]
    },
    {
        path: 'user/update',
        component: UpdateUserComponent,
        canActivate: [UserGuard]
    },
    {
        path: 'shop',
        component: ShopComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'product/:type/:id',
        component: ProductComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
