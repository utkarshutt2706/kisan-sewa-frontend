import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { regex } from '../../../modules/core/constants';
import { MustMatch } from './must-match.validator';
import { BoothService } from 'src/app/modules/core/services/booth.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { StorageService } from 'src/app/modules/core/services/storage.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { LoaderService } from 'src/app/modules/core/services/loader.service';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

    public updatePasswordForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<UpdatePasswordComponent>,
        private boothService: BoothService,
        private userService: UserService,
        private storage: StorageService,
        private dialog: MatDialog,
        private loaderService: LoaderService
    ) { }

    ngOnInit(): void {
        this.initFOrm();
    }

    private initFOrm() {
        this.updatePasswordForm = new FormGroup(
            {
                currentPass: new FormControl(null, Validators.required),
                newPass: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
                confirmPass: new FormControl(null, [Validators.required, Validators.pattern(regex.password)])
            },
            {
                validators: MustMatch.MatchPassword
            }
        );
    }

    public onUpdatePass() {
        this.loaderService.showLoader();
        const userType = this.storage.getCurrentUserType();
        const userEmail = this.storage.getCurrentUserEmail();
        switch (userType) {
            case 'booth':
                this.boothService.updatePassword(this.updatePasswordForm, userEmail).subscribe(
                    response => {
                        this.loaderService.hideLoader();
                        this.dialogRef.close();
                        this.dialog.open(SuccessDialogComponent, {
                            data: response
                        });
                    },
                    error => {
                        this.loaderService.hideLoader();
                        this.dialog.open(ErrorDialogComponent, {
                            data: error.error
                        });
                    },
                    () => { }
                );
                break;
            case 'user':
                this.userService.updatePassword(this.updatePasswordForm, userEmail).subscribe(
                    response => {
                        this.loaderService.hideLoader();
                        this.dialogRef.close();
                        this.dialog.open(SuccessDialogComponent, {
                            data: response
                        });
                    },
                    error => {
                        this.loaderService.hideLoader();
                        this.dialog.open(ErrorDialogComponent, {
                            data: error.error
                        });
                    },
                    () => { }
                );
                break;
            default:
                this.loaderService.hideLoader();
                this.dialog.open(ErrorDialogComponent);
                break;
        }
    }

    public onCancel() {
        this.dialogRef.close();
    }

}
