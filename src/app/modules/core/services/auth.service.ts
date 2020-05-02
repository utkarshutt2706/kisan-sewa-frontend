import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { apiEndPoint } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isLoggedIn = false;
    public currentUserType: string;

    constructor(private http: HttpClient) { }

    public register(form: FormGroup, registerAs: string) {
        form.value.registerAs = registerAs;
        return this.http.post(`${apiEndPoint.auth}register`, form.value);
    }

    public login(form: FormGroup, loginAs: string) {
        form.value.loginAs = loginAs;
        return this.http.post(`${apiEndPoint.auth}login`, form.value);
    }

    public forgotPassword(form: FormGroup, forgotAs: string) {
        form.value.forgotAs = forgotAs;
        return this.http.post(`${apiEndPoint.auth}forgot-password`, form.value);
    }

    public resetPassword(form: FormGroup, resetAs: string) {
        form.value.resetAs = resetAs;
        return this.http.post(`${apiEndPoint.auth}reset-password`, form.value);
    }

}
