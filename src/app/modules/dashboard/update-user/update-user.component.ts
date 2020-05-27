import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { regex } from '../../core/constants';
import { StorageService } from '../../core/services/storage.service';
import { LoaderService } from '../../core/services/loader.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { UserService } from '../../core/services/user.service';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { UpdatePasswordComponent } from 'src/app/shared/components/update-password/update-password.component';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

    public updateUserForm: FormGroup;
    private currentUser: any;
    private currentLang: string;
    public uploadedImage = null;

    private message = {
        error: {
            en: 'An error occured while choosing the image, please try again.',
            hi: 'छवि चुनते समय एक त्रुटि हुई, कृपया पुनः प्रयास करें।'
        },
        fileNo: {
            en: 'You can only choose one image.',
            hi: 'आप केवल एक छवि चुन सकते हैं।'
        },
        fileSize: {
            en: 'File exceeds the maximum allowed size.',
            hi: 'फ़ाइल अधिकतम अनुमत आकार से अधिक है।'
        },
        fileType: {
            en: 'File type is not supported.',
            hi: 'फ़ाइल प्रकार समर्थित नहीं है।'
        }
    }

    constructor(
        private storage: StorageService,
        private loaderService: LoaderService,
        private router: Router,
        private dialog: MatDialog,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.currentLang = this.storage.getCurrentLang();
        this.currentUser = JSON.parse(this.storage.getCurrentUser());
        this.initForm();
    }

    private initForm() {
        this.updateUserForm = new FormGroup(
            {
                name: new FormControl(this.currentUser.name, Validators.required),
                phone: new FormControl(this.currentUser.phone, [Validators.required, Validators.pattern(regex.mobileNo)]),
                email: new FormControl(this.currentUser.email, [Validators.required, Validators.pattern(regex.emailId)]),
                occupation: new FormControl(this.currentUser.occupation, Validators.required),
                address: new FormControl(this.currentUser.address, [Validators.required, Validators.pattern(regex.address)])
            }
        )
    }

    public onCancel() {
        this.router.navigateByUrl('dashboard/booth');
    }

    public onFileSelect(event) {
        if (event.target.files.length > 0) {
            if (event.target.files.length > 1) {
                let message = this.message.fileNo.en;
                if (this.currentLang === 'hi') {
                    message = this.message.fileNo.hi;
                }
                this.dialog.open(ErrorDialogComponent, {
                    data: { message }
                });
                return;
            }
            const fileName = event.target.files[0].name;
            const fileSize = event.target.files[0].size;
            const validSize = this.checkFileSize(fileSize);
            const validType = this.checkFileFormat(fileName);
            if (validSize && validType) {
                this.loaderService.showLoader();
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (param) => {
                    this.uploadedImage = reader.result;
                    this.loaderService.hideLoader();
                };
            }
            else {
                return;
            }
        } else {
            let message = this.message.error.en;
            if (this.currentLang === 'hi') {
                message = this.message.error.hi;
            }
            this.dialog.open(ErrorDialogComponent, {
                data: { message }
            })
        }
    }

    private checkFileSize(fileSize: number) {
        if (fileSize > 200000) {
            let message = this.message.fileSize.en;
            if (this.currentLang === 'hi') {
                message = this.message.fileSize.hi;
            }
            this.dialog.open(ErrorDialogComponent, {
                data: { message }
            });
            return false;
        } else {
            return true;
        }
    }

    private checkFileFormat(fileName: string) {
        const ext = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
        if (ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png') {
            let message = this.message.fileType.en;
            if (this.currentLang === 'hi') {
                message = this.message.fileType.hi;
            }
            this.dialog.open(ErrorDialogComponent, {
                data: { message }
            });
            return false;
        } else {
            return true;
        }
    }

    public onUpdate() {
        this.loaderService.showLoader();
        // const formData = new FormData();
        // formData.append('name', this.updateUserForm.value.name);
        // formData.append('email', this.updateUserForm.value.email);
        // formData.append('occupation', this.updateUserForm.value.occupation);
        // formData.append('address', this.updateUserForm.value.address);
        // formData.append('phone', this.updateUserForm.value.phone);
        // if (this.selectedFile) {
        //     formData.append('picture', this.selectedFile);
        // }
        this.userService.updateUser(this.updateUserForm, this.uploadedImage).subscribe(
            response => {
                this.loaderService.hideLoader();
                const dialogRef = this.dialog.open(SuccessDialogComponent, {
                    data: response
                });
                dialogRef.afterClosed().subscribe(
                    close => {
                        this.router.navigateByUrl('dashboard/user');
                    }
                );
            },
            error => {
                this.loaderService.hideLoader();
                this.dialog.open(ErrorDialogComponent, {
                    data: {}
                });
            },
            () => { }
        );
    }

    public removeImage() {
        this.uploadedImage = null;
    }

    public updatePassword() {
        this.dialog.open(UpdatePasswordComponent);
    }

}
