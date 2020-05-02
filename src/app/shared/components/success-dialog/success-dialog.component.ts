import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
        public dialogRef: MatDialogRef<SuccessDialogComponent>
    ) { }

    ngOnInit() {
        if(this.data.message) {
            this.message = this.data.message;
        } else {
            this.message = 'Success';
        }
        if(this.data.detail) {
            this.detail = this.data.detail;
        }
    }

    public onClose() {
        this.dialogRef.close();
    }

}
