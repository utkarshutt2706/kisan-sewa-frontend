import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiEndPoint } from '../constants';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    constructor(private http: HttpClient, private storage: StorageService) { }

    public getItemsForSale() {
        return this.http.get(`${apiEndPoint.baseUrl}sell`);
    }

    public getItemsForRent() {
        return this.http.get(`${apiEndPoint.baseUrl}rent`);
    }

    public getItemForSaleById(id: string) {
        return this.http.get(`${apiEndPoint.baseUrl}sell/${id}`);
    }

    public getItemForRentById(id: string) {
        return this.http.get(`${apiEndPoint.baseUrl}rent/${id}`);
    }

    public setItemForSale(form: FormGroup, imageArr: string[]) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            form.value.lang = currentLang;
        } else {
            form.value.lang = 'en';
        }
        for (let i = 0; i < imageArr.length; i++) {
            const element = imageArr[i];
            switch (i) {
                case 0:
                    form.value.picture0 = element;
                    break;
                case 1:
                    form.value.picture1 = element;
                    break;
                case 2:
                    form.value.picture2 = element;
                    break;
                case 3:
                    form.value.picture3 = element;
                    break;
                case 4:
                    form.value.picture4 = element;
                    break;
                default:
                    break;
            }
        }
        const currentUser = JSON.parse(this.storage.getCurrentUser());
        form.value.soldBy = currentUser._id;
        return this.http.post(`${apiEndPoint.baseUrl}sell`, form.value);
    }

    public setItemForRent(form: FormGroup, imageArr: string[]) {
        const currentLang = this.storage.getCurrentLang();
        if (currentLang) {
            form.value.lang = currentLang;
        } else {
            form.value.lang = 'en';
        }
        for (let i = 0; i < imageArr.length; i++) {
            const element = imageArr[i];
            switch (i) {
                case 0:
                    form.value.picture0 = element;
                    break;
                case 1:
                    form.value.picture1 = element;
                    break;
                case 2:
                    form.value.picture2 = element;
                    break;
                case 3:
                    form.value.picture3 = element;
                    break;
                case 4:
                    form.value.picture4 = element;
                    break;
                default:
                    break;
            }
        }
        const currentUser = JSON.parse(this.storage.getCurrentUser());
        form.value.soldBy = currentUser._id;
        return this.http.post(`${apiEndPoint.baseUrl}rent`, form.value);
    }

}
