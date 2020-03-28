import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { regex } from '../../core/constants';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-register-farmer',
    templateUrl: './register-farmer.component.html',
    styleUrls: ['./register-farmer.component.scss']
})
export class RegisterFarmerComponent implements OnInit {

    @Input() registerAs: string;
    @Output() cancel = new EventEmitter<any>();

    public isLoading = false;
    public registerFarmerForm: FormGroup;

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.registerFarmerForm = new FormGroup(
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
        this.authService.register(this.registerFarmerForm, 'farmer').subscribe(
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
