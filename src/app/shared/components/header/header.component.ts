import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/modules/core/services/auth.service';
import { StorageService } from 'src/app/modules/core/services/storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    constructor(
        public router: Router,
        public authService: AuthService,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        const currentUser = this.storage.getCurrentUserEmail();
        const currentUserType = this.storage.getCurrentUserType();
        if(currentUser && currentUserType) {
            this.authService.isLoggedIn = true;
            this.authService.currentUserType = currentUserType;
        } else {
            this.logout();
        }
    }

    public logout() {
        this.authService.isLoggedIn = false;
        this.authService.currentUserType = '';
        this.storage.removeCurrentUser();
        this.router.navigateByUrl('');
    }

    public openDashBoard() {
        this.router.navigateByUrl('dashboard/' + this.authService.currentUserType);
    }

}
