import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public isLoggingIn = false;
    public loginAs: string;

    constructor() { }

    ngOnInit(): void {
    }

    public login(loginAs: string) {
        this.loginAs = loginAs;
        this.isLoggingIn = true;
    }

    public cancel() {
        this.loginAs = '';
        this.isLoggingIn = false;
    }

}
