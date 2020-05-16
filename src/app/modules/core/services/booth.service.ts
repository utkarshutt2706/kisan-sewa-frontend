import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { apiEndPoint } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class BoothService {

    constructor(private http: HttpClient) { }

    public getNearbyBooths(coords: any) {
        const params = new HttpParams()
            .set('lat', coords.lat)
            .set('lon', coords.lon)
            .set('limit', coords.limit);
        return this.http.get(`${apiEndPoint.booth}nearby`, {
            params
        });
    }

}
