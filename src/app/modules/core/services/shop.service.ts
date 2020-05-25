import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiEndPoint } from '../constants';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    constructor(private http: HttpClient, private storage: StorageService) { }

    public getItemsForSale(params: any) {
        return this.http.get(`${apiEndPoint.baseUrl}sell`);
    }

    public getItemsForRent(params: any) {
        return this.http.get(`${apiEndPoint.baseUrl}rent`);
    }

    public setItemForSale(formData: FormData) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            formData.append('lang', currentLang);
        } else {
            formData.append('lang', 'en');
        }
        return this.http.post(`${apiEndPoint.baseUrl}sell`, formData);
    }

    public setItemForRent(formData: FormData) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            formData.append('lang', currentLang);
        } else {
            formData.append('lang', 'en');
        }
        return this.http.post(`${apiEndPoint.baseUrl}rent`, formData);
    }

}
