import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {

    constructor(private storage: StorageService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.storage.getCurrentUserType() === 'user') {
            return true;
        } else {
            this.router.navigateByUrl('/dashboard/booth');
            return false;
        }
    }

}
