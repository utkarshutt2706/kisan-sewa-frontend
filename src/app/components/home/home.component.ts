import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(public authService: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    public getStarted() {
        this.router.navigateByUrl('dashboard/' + this.authService.currentUserType);
    }

}
