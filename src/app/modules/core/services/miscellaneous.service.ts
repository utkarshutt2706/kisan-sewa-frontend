import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { apiEndPoint } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class MiscellaneousService {

    constructor(private http: HttpClient) { }

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

}
