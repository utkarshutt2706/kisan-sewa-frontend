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
        this.currentLang = this.storage.getCurrentLang();
    }

    public onLanguageChoose(lang: string) {
        this.languageEmitter.emit(lang);
        this.currentLang = lang;
    }

}
