import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { apiEndPoint } from '../constants';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class MiscellaneousService {

    constructor(private http: HttpClient, private storage: StorageService) { }

    public getWeather(coords: any) {
        const params = new HttpParams()
            .set('lat', coords.lat)
            .set('lon', coords.lon);
        return this.http.get(`${apiEndPoint.baseUrl}weather`, {
            params
        });
    }

    public getMarketRate(coords: any) {
        const params = new HttpParams()
            .set('lat', coords.lat)
            .set('lon', coords.lon);
        return this.http.get(`${apiEndPoint.baseUrl}market-rate`, {
            params
        });
    }

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
