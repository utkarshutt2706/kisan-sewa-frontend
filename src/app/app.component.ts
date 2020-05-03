import { Component, OnInit } from '@angular/core';

import { AuthService } from './modules/core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'Kisan Sewa';

    constructor(
        public authService: AuthService,
        private translate: TranslateService
    ) {
        translate.setDefaultLang('en');
    }

    ngOnInit(): void {
    }

    onLanguageChoose(lang: string) {
        this.translate.use(lang);
        console.log(lang);
        console.log(typeof lang);
    }

}
