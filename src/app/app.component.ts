import { Component, OnInit } from '@angular/core';

import { AuthService } from './modules/core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './modules/core/services/storage.service';
import { LoaderService } from './modules/core/services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'Kisan Sewa';

    constructor(
        public authService: AuthService,
        private translate: TranslateService,
        private storage: StorageService,
        private loaderService: LoaderService
    ) { }

    ngOnInit(): void {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            this.translate.setDefaultLang(currentLang);
        } else {
            this.translate.setDefaultLang('en');
        }
        this.findMe();
    }

    onLanguageChoose(lang: string) {
        this.loaderService.showLoader();
        this.translate.use(lang).subscribe(
            res => {
                this.loaderService.hideLoader();
            }
        );
        this.storage.setCurrentLang(lang);
    }

    private findMe() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

}
