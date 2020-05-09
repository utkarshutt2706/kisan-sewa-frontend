import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BoothComponent } from './booth/booth.component';
import { SellerComponent } from './seller/seller.component';
import { FarmerComponent } from './farmer/farmer.component';

@NgModule({
    declarations: [
        BoothComponent,
        SellerComponent,
        FarmerComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatExpansionModule,
        MatInputModule,
        MatFormFieldModule,
        TranslateModule
    ]
})
export class DashboardModule { }
