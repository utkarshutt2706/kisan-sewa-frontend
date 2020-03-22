import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { regex } from '../../core/constants';

@Component({
    selector: 'app-login-seller',
    templateUrl: './login-seller.component.html',
    styleUrls: ['./login-seller.component.scss']
})
export class LoginSellerComponent implements OnInit {

    @Input() loginAs: string;
    @Output() cancel = new EventEmitter<any>();

    public loginSellerForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.loginSellerForm = new FormGroup(
            {
                username: new FormControl(null, [Validators.required, Validators.pattern(regex.emailOrUsername)]),
                password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)])
            }
        )
    }

    public onLogin() {
        console.log('login');
    }

    public onCancel() {
        this.cancel.emit();
    }

}
