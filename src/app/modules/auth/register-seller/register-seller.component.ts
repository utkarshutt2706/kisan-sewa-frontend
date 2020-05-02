import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { regex } from '../../core/constants';
import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
    selector: 'app-register-seller',
    templateUrl: './register-seller.component.html',
    styleUrls: ['./register-seller.component.scss']
})
export class RegisterSellerComponent implements OnInit {

    @Input() registerAs: string;
    @Output() cancel = new EventEmitter<any>();

    public registerSellerForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private loaderService: LoaderService,
        private dialog: MatDialog
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
        this.loaderService.showLoader();
        this.authService.register(this.registerSellerForm, 'seller').subscribe(
            (response: any) => {
                this.loaderService.hideLoader();
                const dialogRef = this.dialog.open(SuccessDialogComponent, {
                    data: { response }
                });
                dialogRef.afterClosed().subscribe(change => {
                    this.router.navigateByUrl('/kisan/login');
                });
            },
            error => {
                this.loaderService.hideLoader();
                this.dialog.open(ErrorDialogComponent, {
                    data: error.error
                });
            },
            () => {}
        );
    }

    public onCancel() {
        this.cancel.emit();
    }

}
