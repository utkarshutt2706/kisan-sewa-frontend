import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiEndPoint } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    constructor(private http: HttpClient) { }

    public getItemsForSale(params: any) {
        return this.http.get(`${apiEndPoint.baseUrl}sell`);
    }

    public getItemsForRent(params: any) {
        return this.http.get(`${apiEndPoint.baseUrl}rent`);
    }

}
