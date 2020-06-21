import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { apiEndPoint } from '../constants';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class BoothService {

    constructor(private http: HttpClient, private storage: StorageService) { }

    public getNearbyBooths(coords: any) {
        const params = new HttpParams()
            .set('lat', coords.lat)
            .set('lon', coords.lon)
            .set('limit', coords.limit);
        return this.http.get(`${apiEndPoint.booth}nearby`, {
            params
        });
    }

    public updateBooth(form: FormGroup, image: string) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            form.value.lang = currentLang;
        } else {
            form.value.lang = 'en';
        }
        form.value.picture = image;
        return this.http.put(`${apiEndPoint.booth}update`, form.value);
    }

    public updatePassword(form: FormGroup, email: string) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            form.value.lang = currentLang;
        } else {
            form.value.lang = 'en';
        }
        form.value.email = email;
        return this.http.put(`${apiEndPoint.booth}password`, form.value);
    }

}
