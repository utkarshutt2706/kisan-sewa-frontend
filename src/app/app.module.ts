import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { TeamComponent } from './components/team/team.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewsletterComponent } from './shared/components/newsletter/newsletter.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SuccessDialogComponent } from './shared/components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdatePasswordComponent } from './shared/components/update-password/update-password.component';
import { LocationComponent } from './shared/components/location/location.component';
import { NoInternetComponent } from './shared/components/no-internet/no-internet.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        AboutComponent,
        ServicesComponent,
        TeamComponent,
        PageNotFoundComponent,
        NewsletterComponent,
        LoaderComponent,
        SuccessDialogComponent,
        ErrorDialogComponent,
        UpdatePasswordComponent,
        LocationComponent,
        NoInternetComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDi4t47RZNs0ILUqUS5-xH3XpqbV-HYMpE'
        })
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 3000
            }
        }
    ],
    entryComponents: [
        SuccessDialogComponent,
        ErrorDialogComponent,
        UpdatePasswordComponent,
        NoInternetComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
