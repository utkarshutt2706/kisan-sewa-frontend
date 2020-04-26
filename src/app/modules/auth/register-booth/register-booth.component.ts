import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { regex } from '../../core/constants';
import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';

@Component({
    selector: 'app-register-booth',
    templateUrl: './register-booth.component.html',
    styleUrls: ['./register-booth.component.scss'],
})
export class RegisterBoothComponent implements OnInit {

    @Input() registerAs: string;
    @Output() cancel = new EventEmitter<any>();

    public registerBoothForm: FormGroup;

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router,
        private loaderService: LoaderService
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.registerBoothForm = new FormGroup(
            {
                name: new FormControl(null, Validators.required),
                email: new FormControl(null, [Validators.required, Validators.pattern(regex.emailId)]),
                boothName: new FormControl(null, Validators.required),
                address: new FormControl(null, [Validators.required, Validators.pattern(regex.address)]),
                phone: new FormControl(null, [Validators.required, Validators.pattern(regex.mobileNo)])
            }
        );
    }

    public onRegister() {
        this.loaderService.showLoader();
        this.authService.register(this.registerBoothForm, 'booth').subscribe(
            (response: any) => {
                this.loaderService.hideLoader();
                this.snackBar.open(response.detail, 'Ok', {
                    duration: 10000
                });
                this.router.navigateByUrl('/kisan/login');
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
