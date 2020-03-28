import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { TeamComponent } from './components/team/team.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from './shared/components/loader/loader.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        AboutComponent,
        ServicesComponent,
        TeamComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LoaderModule,
        MatSnackBarModule
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 3000
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
