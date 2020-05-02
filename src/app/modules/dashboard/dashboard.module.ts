import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BoothComponent } from './booth/booth.component';
import { SellerComponent } from './seller/seller.component';
import { FarmerComponent } from './farmer/farmer.component';


@NgModule({
  declarations: [BoothComponent, SellerComponent, FarmerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
