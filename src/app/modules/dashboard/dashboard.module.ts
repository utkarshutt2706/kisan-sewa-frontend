import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BoothComponent } from './booth/booth.component';
import { SellerComponent } from './seller/seller.component';
import { FarmerComponent } from './farmer/farmer.component';
import { MarketRatesComponent } from './market-rates/market-rates.component';
import { WeatherComponent } from './weather/weather.component';
import { SellComponent } from './sell/sell.component';
import { ShopComponent } from './shop/shop.component';
import { NearbyBoothsComponent } from './nearby-booths/nearby-booths.component';

@NgModule({
    declarations: [
        BoothComponent,
        SellerComponent,
        FarmerComponent,
        MarketRatesComponent,
        WeatherComponent,
        SellComponent,
        ShopComponent,
        NearbyBoothsComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatExpansionModule,
        MatInputModule,
        MatFormFieldModule,
        TranslateModule,
        MatTableModule
    ]
})
export class DashboardModule { }
