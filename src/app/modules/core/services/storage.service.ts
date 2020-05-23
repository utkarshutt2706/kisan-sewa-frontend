import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    public setCurrentLang(lang: string) {
        localStorage.setItem('currentLang', lang);
    }

    public getCurrentLang() {
        return localStorage.getItem('currentLang');
    }

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

    // public setCurrentUserVerified(status: boolean) {
    //     let isVerified: string;
    //     if (status) {
    //         isVerified = 'true';
    //     } else {
    //         isVerified = 'false';
    //     }
    //     localStorage.setItem('isVerified', isVerified);
    // }

    // public getCurrentUserVerified() {
    //     return localStorage.getItem('isVerified');
    // }

    public setSkipUpdatePassword() {
        localStorage.setItem('skipUpdatePassword', 'true');
    }

    public getSkipUpdatePassword() {
        return localStorage.getItem('skipUpdatePassword');
    }

    public setCurrentUser(obj: any) {
        localStorage.setItem('userObj', JSON.stringify(obj));
    }

    public getCurrentUser() {
        return localStorage.getItem('userObj');
    }

    public removeCurrentUser() {
        localStorage.removeItem('currentUser');
        // localStorage.removeItem('isVerified');
        localStorage.removeItem('userObj');
        localStorage.removeItem('currentUserType');
        localStorage.removeItem('skipUpdatePassword');
    }

    public clearStorage() {
        localStorage.clear();
    }

}
