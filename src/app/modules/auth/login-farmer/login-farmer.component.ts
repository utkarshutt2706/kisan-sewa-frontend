import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { regex } from '../../core/constants';
import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';

@Component({
    selector: 'app-login-farmer',
    templateUrl: './login-farmer.component.html',
    styleUrls: ['./login-farmer.component.scss']
})
export class LoginFarmerComponent implements OnInit {

    @Input() loginAs: string;
    @Output() cancel = new EventEmitter<any>();

    public loginFarmerForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private loaderService: LoaderService
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.loginFarmerForm = new FormGroup(
            {
                username: new FormControl(null, Validators.required),
                password: new FormControl(null, Validators.required)
            }
        );
    }

    public onLogin() {
        this.loaderService.showLoader();
        this.authService.login(this.loginFarmerForm, 'farmer').subscribe(
            (response: any) => {
                this.loaderService.hideLoader();
                this.snackBar.open(JSON.stringify(response), 'Ok');
                this.router.navigateByUrl('');
            },
            error => {
                this.loaderService.hideLoader();
                this.snackBar.open(error.error.message, 'Ok');
            },
            () => {}
        );
    }

    public onCancel() {
        this.cancel.emit();
    }

}
