import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { regex } from '../../core/constants';

@Component({
    selector: 'app-login-booth',
    templateUrl: './login-booth.component.html',
    styleUrls: ['./login-booth.component.scss']
})
export class LoginBoothComponent implements OnInit {

    @Input() loginAs: string;
    @Output() cancel = new EventEmitter<any>();

    public loginBoothForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.loginBoothForm = new FormGroup(
            {
                username: new FormControl(null, [Validators.required, Validators.pattern(regex.emailOrUsername)]),
                password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)])
            }
        );
    }

    public onLogin() {
        console.log('login');
    }

    public onCancel() {
        this.cancel.emit();
    }

}
