import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { regex } from '../../core/constants';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-register-seller',
    templateUrl: './register-seller.component.html',
    styleUrls: ['./register-seller.component.scss']
})
export class RegisterSellerComponent implements OnInit {

    @Input() registerAs: string;
    @Output() cancel = new EventEmitter<any>();

    public isLoading = false;
    public registerSellerForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.registerSellerForm = new FormGroup(
            {
                name: new FormControl(null, Validators.required),
                phone: new FormControl(null, [Validators.required, Validators.pattern(regex.mobileNo)]),
                email: new FormControl(null, [Validators.required, Validators.pattern(regex.emailId)]),
                address: new FormControl(null, [Validators.required, Validators.pattern(regex.address)])
            }
        );
    }

    public onRegister() {
        this.isLoading = true;
        this.authService.register(this.registerSellerForm, 'seller').subscribe(
            (response: any) => {
                this.isLoading = false;
                this.snackBar.open(response.detail, 'Ok', {
                    duration: 10000
                });
                this.router.navigateByUrl('/kisan/login');
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
