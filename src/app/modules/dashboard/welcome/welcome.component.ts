import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { StorageService } from 'src/app/modules/core/services/storage.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

    public name: string;

    constructor(
        private storage: StorageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        const user = JSON.parse(this.storage.getCurrentUser());
        this.name = user.name;
    }

    public updateProfile() {
        const userType = this.storage.getCurrentUserType();
        this.router.navigateByUrl(`/dashboard/${userType}/update`);
    }

}
