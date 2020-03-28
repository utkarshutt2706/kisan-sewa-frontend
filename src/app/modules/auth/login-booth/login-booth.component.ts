import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { regex } from '../../core/constants';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login-booth',
    templateUrl: './login-booth.component.html',
    styleUrls: ['./login-booth.component.scss']
})
export class LoginBoothComponent implements OnInit {

    @Input() loginAs: string;
    @Output() cancel = new EventEmitter<any>();

    public isLoading = false;
    public loginBoothForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
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
        this.isLoading = true;
        this.authService.login(this.loginBoothForm, 'booth').subscribe(
            (response: any) => {
                this.isLoading = false;
                this.snackBar.open(JSON.stringify(response), 'Ok');
                this.router.navigateByUrl('');
            },
            error => {
                this.isLoading = false;
                this.snackBar.open(error.error.message, 'Ok');
            },
            () => {}
        );
    }

    public onCancel() {
        this.cancel.emit();
    }

}
