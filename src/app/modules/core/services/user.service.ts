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

    public getUserById(id: string) {
        return this.http.get(`${apiEndPoint.user}${id}`);
    }

    public reportUser(param: any) {
        return this.http.put(`${apiEndPoint.user}report`, param);
    }

    public unReportUser(param: any) {
        return this.http.put(`${apiEndPoint.user}un-report`, param);
    }

    public followUser(param: any) {
        return this.http.put(`${apiEndPoint.user}follow`, param);
    }

    public unFollowUser(param: any) {
        return this.http.put(`${apiEndPoint.user}un-follow`, param);
    }

}
