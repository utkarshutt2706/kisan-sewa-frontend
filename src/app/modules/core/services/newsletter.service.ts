import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { apiEndPoint } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class NewsletterService {

    constructor(private http: HttpClient) { }

    public newsletterSubscribe(form: FormGroup) {
        return this.http.post(`${apiEndPoint.newsletter}`, form.value);
    }
}
