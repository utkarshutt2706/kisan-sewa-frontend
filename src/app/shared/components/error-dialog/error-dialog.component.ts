import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from 'src/app/modules/core/services/storage.service';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

    title = 'Angular-Interceptor';

    public message: string = null;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ErrorDialogComponent>,
        private storage: StorageService
    ) {
    }

    ngOnInit() {
        if (this.data.message) {
            this.message = this.data.message;
        } else {
            if (this.storage.getCurrentLang() === 'hi') {
                this.message = 'एक त्रुटि पाई गई';
            } else {
                this.message = 'An error occured';
            }
        }
    }

    public onClose() {
        this.dialogRef.close();
    }

}
