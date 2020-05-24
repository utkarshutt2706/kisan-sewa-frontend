import { MatDialog } from '@angular/material/dialog';
import { Observable, fromEvent } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './modules/core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './modules/core/services/storage.service';
import { LoaderService } from './modules/core/services/loader.service';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './shared/components/success-dialog/success-dialog.component';
import { NoInternetComponent } from './shared/components/no-internet/no-internet.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    private onlineEvent: Observable<Event>;
    private offlineEvent: Observable<Event>;
    title = 'Kisan Sewa';

    constructor(
        public authService: AuthService,
        private translate: TranslateService,
        private storage: StorageService,
        private loaderService: LoaderService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.checkInternetStatus();
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            this.translate.setDefaultLang(currentLang);
        } else {
            this.translate.setDefaultLang('en');
        }
    }

    private checkInternetStatus() {

        this.onlineEvent = fromEvent(window, 'online');
        this.offlineEvent = fromEvent(window, 'offline');
        let dialogRef: any;

        this.onlineEvent.subscribe(
            event => {
                const currentLang = this.storage.getCurrentLang();
                let message = 'You are now connected to the internet.';
                if (currentLang === 'hi') {
                    message = 'अब आप इंटरनेट से जुड़े हैं।';
                }
                const onlineDialogRef = this.dialog.open(SuccessDialogComponent, {
                    data: { message }
                });
                if(dialogRef) {
                    dialogRef.close();
                }
                setTimeout(() => {
                    onlineDialogRef.close();
                }, 5000);
            }
        );
        this.offlineEvent.subscribe(
            event => {
                dialogRef = this.dialog.open(NoInternetComponent, {
                    disableClose: true,
                    panelClass: 'no-internet'
                });
            }
        )
    }

    public onLanguageChoose(lang: string) {
        this.loaderService.showLoader();
        this.translate.use(lang).subscribe(
            res => {
                this.loaderService.hideLoader();
                this.storage.setCurrentLang(lang);
            },
            error => {
                this.dialog.open(ErrorDialogComponent, {
                    data: error.error
                });
            }
        );
    }

}
