import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private storage: StorageService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this.storage.getCurrentUser() && this.storage.getCurrentUserType() && this.storage.getCurrentUserEmail()) {
            this.router.navigateByUrl(`/dashboard/${this.storage.getCurrentUserType()}`);
            return false;
        } else {
            return true;
        }
    }

}
