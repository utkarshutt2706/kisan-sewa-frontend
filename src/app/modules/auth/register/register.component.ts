import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../core/services/storage.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public isRegistering = false;
    public registerAs: string;

    constructor(public storage: StorageService) { }

    ngOnInit(): void {
    }

    public register(registerAs: string) {
        this.registerAs = registerAs;
        this.isRegistering = true;
    }

    public cancel() {
        this.registerAs = '';
        this.isRegistering = false;
    }

}
