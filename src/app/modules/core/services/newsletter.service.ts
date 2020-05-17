import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { apiEndPoint } from '../constants';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class NewsletterService {

    constructor(private http: HttpClient, private storage: StorageService) { }

    public newsletterSubscribe(form: FormGroup) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            form.value.lang = currentLang;
        } else {
            form.value.lang = 'en';
        }
        return this.http.post(`${apiEndPoint.newsletter}`, form.value);
    }
}
