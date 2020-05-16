import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiEndPoint } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class MiscellaneousService {

    constructor(private http: HttpClient) { }

    public getWeather(coords: any) {
        return this.http.post(`${apiEndPoint.baseUrl}weather`, coords);
    }

}
