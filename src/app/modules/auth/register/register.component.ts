import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public isRegistering = false;
    public registerAs: string;

    constructor() { }

    ngOnInit(): void {
    }

    public register(registerAs: string) {
        this.registerAs = registerAs;
        this.isRegistering = true;
    }

    cancel() {
        this.registerAs = '';
        this.isRegistering = false;
    }

}
