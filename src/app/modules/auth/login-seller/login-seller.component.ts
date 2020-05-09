import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
    selector: 'app-login-seller',
    templateUrl: './login-seller.component.html',
    styleUrls: ['./login-seller.component.scss']
})
export class LoginSellerComponent implements OnInit {

    @Output() cancel = new EventEmitter<any>();

    public loginSellerForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private loaderService: LoaderService,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.loginSellerForm = new FormGroup(
            {
                username: new FormControl(null, Validators.required),
                password: new FormControl(null, Validators.required)
            }
        );
    }

    public onLogin() {
        this.loaderService.showLoader();
        this.authService.login(this.loginSellerForm, 'seller').subscribe(
            (response: any) => {
                this.loaderService.hideLoader();
                this.storage.setCurrentUserEmail(response.email);
                this.storage.setCurrentUserVerified(response.isVerified);
                this.storage.setCurrentUserType('seller');
                this.authService.isLoggedIn = true;
                this.authService.currentUserType = 'seller';
                this.router.navigateByUrl('dashboard/' + this.authService.currentUserType);
            },
            error => {
                this.loaderService.hideLoader();
                this.snackBar.open(error.error.message, 'Ok');
            },
            () => { }
        );
    }

    public onCancel() {
        this.cancel.emit();
    }

}
