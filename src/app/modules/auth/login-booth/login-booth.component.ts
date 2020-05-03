import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
    selector: 'app-login-booth',
    templateUrl: './login-booth.component.html',
    styleUrls: ['./login-booth.component.scss']
})
export class LoginBoothComponent implements OnInit {

    @Output() cancel = new EventEmitter<any>();

    public loginBoothForm: FormGroup;

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
        this.loginBoothForm = new FormGroup(
            {
                username: new FormControl(null, Validators.required),
                password: new FormControl(null, Validators.required)
            }
        );
    }

    public onLogin() {
        this.loaderService.showLoader();
        this.authService.login(this.loginBoothForm, 'booth').subscribe(
            (response: any) => {
                this.loaderService.hideLoader();
                this.storage.setCurrentUserEmail(response.email);
                this.storage.setCurrentUserVerified(response.isVerified);
                this.storage.setCurrentUserType('booth');
                this.authService.isLoggedIn = true;
                this.authService.currentUserType = 'booth';
                this.router.navigateByUrl('dashboard/' + this.authService.currentUserType);
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
