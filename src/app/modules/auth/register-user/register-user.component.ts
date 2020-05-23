import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { regex } from '../../core/constants';
import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

    @Input() registerAs: string;
    @Output() cancel = new EventEmitter<any>();

    public registerUserForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private loaderService: LoaderService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.registerUserForm = new FormGroup(
            {
                name: new FormControl(null, Validators.required),
                phone: new FormControl(null, [Validators.required, Validators.pattern(regex.mobileNo)]),
                email: new FormControl(null, [Validators.required, Validators.pattern(regex.emailId)]),
                occupation: new FormControl(null, Validators.required),
                address: new FormControl(null, [Validators.required, Validators.pattern(regex.address)])
            }
        );
    }

    public onRegister() {
        this.loaderService.showLoader();
        this.authService.register(this.registerUserForm, 'user').subscribe(
            (response: any) => {
                this.loaderService.hideLoader();
                const dialogRef = this.dialog.open(SuccessDialogComponent, {
                    data: response
                });
                dialogRef.afterClosed().subscribe(change => {
                    this.router.navigateByUrl('/kisan/login');
                });
            },
            (error: any) => {
                this.loaderService.hideLoader();
                this.dialog.open(ErrorDialogComponent, {
                    data: error.error
                });
            },
            () => { }
        );
    }

    public onCancel() {
        this.cancel.emit();
    }

}
