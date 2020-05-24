import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoaderService } from '../../core/services/loader.service';
import { StorageService } from '../../core/services/storage.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
    selector: 'app-sell',
    templateUrl: './sell.component.html',
    styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

    public sellRentForm: FormGroup;
    private selectedFile: File;
    public uploadedImages = [];
    private currentLang: string;

    private message = {
        error: {
            en: 'An error occured while choosing the image, please try again.',
            hi: 'छवि चुनते समय एक त्रुटि हुई, कृपया पुनः प्रयास करें।'
        },
        fileSize: {
            en: 'File exceeds the maximum allowed size.',
            hi: 'फ़ाइल अधिकतम अनुमत आकार से अधिक है।'
        },
        fileType: {
            en: 'File type is not supported.',
            hi: 'फ़ाइल प्रकार समर्थित नहीं है।'
        },
        maxFive: {
            en: 'You can choose a maximum of five images',
            hi: 'आप अधिकतम पाँच चित्र चुन सकते हैं'
        }
    }

    constructor(
        private loaderService: LoaderService,
        private dialog: MatDialog,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        this.initForm();
        this.currentLang = this.storage.getCurrentLang();
    }

    private initForm() {
        this.sellRentForm = new FormGroup(
            {
                title: new FormControl(null, Validators.required),
                desc: new FormControl(null, Validators.required),
                category: new FormControl(null, Validators.required),
                shop: new FormControl(null, Validators.required),
                price: new FormControl(null, Validators.required),
                unit: new FormControl(null, Validators.required)
            }
        );
    }

    public onFileSelect(event) {
        this.uploadedImages = [];
        if (event.target.files.length > 0) {
            if(event.target.files.length > 5) {
                let message = this.message.maxFive.en;
                if (this.currentLang === 'hi') {
                    message = this.message.maxFive.hi;
                }
                this.dialog.open(ErrorDialogComponent, {
                    data: { message }
                });
            }
            const fileNames = [];
            const fileSizes = [];
            for (let i = 0; i < event.target.files.length; i++) {
                const element = event.target.files[i];
                fileNames.push(element.name);
                fileSizes.push(element.size);
            }
            const validSize = this.checkFileSize(fileSizes);
            const validType = this.checkFileFormat(fileNames);
            if (validSize && validType) {
                this.loaderService.showLoader();
                for (let i = 0; i < event.target.files.length; i++) {
                    const element = event.target.files[i];
                    const file = element;
                    this.selectedFile = file;
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (param) => {
                        this.uploadedImages.push(reader.result);
                        if (i === event.target.files.length - 1) {
                            this.loaderService.hideLoader();
                        }
                    };
                }
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
            });
        }
    }

    private checkFileSize(fileSizes: number[]) {
        for (let i = 0; i < fileSizes.length; i++) {
            const element = fileSizes[i];
            if (element > 200000) {
                let message = this.message.fileSize.en;
                if (this.currentLang === 'hi') {
                    message = this.message.fileSize.hi;
                }
                this.dialog.open(ErrorDialogComponent, {
                    data: { message }
                });
                return false;
            }
        }
        return true;
    }

    private checkFileFormat(fileNames: string[]) {
        for (let i = 0; i < fileNames.length; i++) {
            const element = fileNames[i];
            const ext = element.substr(element.lastIndexOf('.') + 1).toLowerCase();
            if (ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png') {
                let message = this.message.fileType.en;
                if (this.currentLang === 'hi') {
                    message = this.message.fileType.hi;
                }
                this.dialog.open(ErrorDialogComponent, {
                    data: { message }
                });
                return false;
            }
        }
        return true;
    }

    public removeImage(index: number) {
        this.uploadedImages.splice(index, 1);
    }

}
