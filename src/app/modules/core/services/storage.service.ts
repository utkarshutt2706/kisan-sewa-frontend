import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    public setCurrentUserEmail(userEmail: string) {
        localStorage.setItem('currentUser', userEmail);
    }

    public getCurrentUserEmail() {
        return localStorage.getItem('currentUser');
    }

    public setCurrentUserType(type: string) {
        localStorage.setItem('currentUserType', type);
    }

    public getCurrentUserType() {
        return localStorage.getItem('currentUserType');
    }

    public setCurrentUserVerified(status: boolean) {
        let isVerified: string;
        if(status) {
            isVerified = 'true';
        } else {
            isVerified = 'false';
        }
        localStorage.setItem('isVerified', isVerified);
    }

    public getCurrentUserVerified() {
        return localStorage.getItem('isVerified');
    }

    public removeCurrentUser() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isVerified');
        localStorage.removeItem('currentUserType');
    }



    public clearStorage() {
        localStorage.clear();
    }

}
