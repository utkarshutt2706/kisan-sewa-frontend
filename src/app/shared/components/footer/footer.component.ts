import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Output() languageEmitter: EventEmitter<any> = new EventEmitter<any>();
    public currentLang = 'en';

    constructor() { }

    ngOnInit(): void {
    }

    public onLanguageChoose(lang: string) {
        this.languageEmitter.emit(lang);
        this.currentLang = lang;
    }

}
