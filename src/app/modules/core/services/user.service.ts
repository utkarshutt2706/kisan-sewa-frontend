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

    public updateUser(form: FormGroup, image: string) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            form.value.lang = currentLang;
        } else {
            form.value.lang = 'en';
        }
        form.value.picture = image;
        return this.http.put(`${apiEndPoint.user}update`, form.value);
    }

    public updatePassword(form: FormGroup, email: string) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            form.value.lang = currentLang;
        } else {
            form.value.lang = 'en';
        }
        form.value.email = email;
        return this.http.put(`${apiEndPoint.user}password`, form.value);
    }

}
