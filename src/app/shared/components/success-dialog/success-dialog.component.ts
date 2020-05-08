import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from 'src/app/modules/core/services/storage.service';

@Component({
    selector: 'app-success-dialog',
    templateUrl: './success-dialog.component.html',
    styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

    public message: string;
    public detail: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<SuccessDialogComponent>,
        private storage: StorageService
    ) { }

    ngOnInit() {
        if(this.data.message) {
            this.message = this.data.message;
        } else {
            if(this.storage.getCurrentLang()==='hi') {
                this.message = 'प्रक्रिया सफलतापूर्वक पूरी हुई';
            } else {
                this.message = 'Success';
            }
        }
        if(this.data.detail) {
            this.detail = this.data.detail;
        }
    }

    public onClose() {
        this.dialogRef.close();
    }

}
