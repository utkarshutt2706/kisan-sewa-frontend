import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html',
    styleUrls: ['./login-user.component.scss']
})
export class LoginFarmerComponent implements OnInit {

    @Output() cancel = new EventEmitter<any>();

    public loginUserForm: FormGroup;

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
        this.loginUserForm = new FormGroup(
            {
                username: new FormControl(null, Validators.required),
                password: new FormControl(null, Validators.required)
            }
        );
    }

    public onLogin() {
        this.loaderService.showLoader();
        this.authService.login(this.loginUserForm, 'user').subscribe(
            (response: any) => {
                this.loaderService.hideLoader();
                this.storage.setCurrentUserEmail(response.email);
                this.storage.setCurrentUser(response);
                this.storage.setCurrentUserType('user');
                this.authService.currentUserType = 'user';
                this.authService.isLoggedIn = true;
                this.router.navigateByUrl('dashboard/user');
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
