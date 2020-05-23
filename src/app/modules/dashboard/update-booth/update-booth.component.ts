import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { regex } from '../../core/constants';
import { BoothService } from '../../core/services/booth.service';
import { StorageService } from '../../core/services/storage.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { LoaderService } from '../../core/services/loader.service';

@Component({
    selector: 'app-update-booth',
    templateUrl: './update-booth.component.html',
    styleUrls: ['./update-booth.component.scss']
})
export class UpdateBoothComponent implements OnInit {

    public updateBoothForm: FormGroup;
    private currentUser: any;
    private currentLang: string;
    public uploadedImage = null;
    private selectedFile: File;

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
        private router: Router,
        private boothService: BoothService,
        private storage: StorageService,
        private dialog: MatDialog,
        private loaderService: LoaderService
    ) { }

    ngOnInit(): void {
        this.currentUser = JSON.parse(this.storage.getCurrentUser());
        this.initForm();
        this.currentLang = this.storage.getCurrentLang();
    }

    private initForm() {
        this.updateBoothForm = new FormGroup(
            {
                name: new FormControl(this.currentUser.name, Validators.required),
                email: new FormControl(this.currentUser.email, [Validators.required, Validators.pattern(regex.emailId)]),
                boothName: new FormControl(this.currentUser.boothName, Validators.required),
                address: new FormControl(this.currentUser.address, [Validators.required, Validators.pattern(regex.address)]),
                phone: new FormControl(this.currentUser.phone, [Validators.required, Validators.pattern(regex.mobileNo)])
            }
        );
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
                this.selectedFile = file;
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
        const formData = new FormData();
        formData.append('name', this.updateBoothForm.value.name);
        formData.append('email', this.updateBoothForm.value.email);
        formData.append('boothName', this.updateBoothForm.value.boothName);
        formData.append('address', this.updateBoothForm.value.address);
        formData.append('phone', this.updateBoothForm.value.phone);
        if (this.selectedFile) {
            formData.append('picture', this.selectedFile);
        }
        this.boothService.updateBooth(formData).subscribe(
            response => {
                this.loaderService.hideLoader();
                console.log(response);
            },
            error => {
                this.loaderService.hideLoader();
                console.log(error);
            },
            () => { }
        );
        this.loaderService.hideLoader();
    }

    public removeImage() {
        this.selectedFile = null;
        this.uploadedImage = null;
    }

}
