import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class BoothGuard implements CanActivate {

    constructor(private storage: StorageService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.storage.getCurrentUserType() === 'booth') {
            return true;
        } else {
            this.router.navigateByUrl('/dashboard/user');
            return false;
        }
    }

}
