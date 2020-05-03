import { Component, OnInit } from '@angular/core';

import { AuthService } from './modules/core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './modules/core/services/storage.service';

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
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            this.translate.setDefaultLang(currentLang);
        } else {
            this.translate.setDefaultLang('en');
        }
    }

    onLanguageChoose(lang: string) {
        this.translate.use(lang);
        this.storage.setCurrentLang(lang);
    }

}
