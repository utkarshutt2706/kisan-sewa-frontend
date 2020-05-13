import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiEndPoint } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class BoothService {

    constructor(private http: HttpClient) { }

    public getNearbyBooths(coords: any) {
        return this.http.post(`${apiEndPoint.booth}nearby`, coords);
    }

}
