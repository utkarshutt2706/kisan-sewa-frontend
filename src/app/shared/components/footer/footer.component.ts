import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from 'src/app/modules/core/services/storage.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Output() languageEmitter: EventEmitter<any> = new EventEmitter<any>();
    public currentLang: string;

    constructor(private storage: StorageService) { }

    ngOnInit(): void {
        const currentLanguage = this.storage.getCurrentLang();
        if (currentLanguage) {
            this.currentLang = currentLanguage;
        } else {
            this.currentLang = 'en';
        }
    }

    public onLanguageChoose(lang: string) {
        this.languageEmitter.emit(lang);
        this.currentLang = lang;
    }

    public backToTop() {
        window.scroll({
            behavior: 'smooth',
            top: 0
        });
    }

}
