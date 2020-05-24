import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiEndPoint } from '../constants';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private storage: StorageService, private http: HttpClient) { }

    public updateUser(formdata: FormData) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            formdata.append('lang', currentLang);
        } else {
            formdata.append('lang', 'en');
        }
        return this.http.post(`${apiEndPoint.user}update`, formdata);
    }

    public updatePassword(form: FormGroup, email: string) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            form.value.lang = currentLang;
        } else {
            form.value.lang = 'en';
        }
        form.value.email = email;
        return this.http.post(`${apiEndPoint.user}password`, form.value);
    }

}
