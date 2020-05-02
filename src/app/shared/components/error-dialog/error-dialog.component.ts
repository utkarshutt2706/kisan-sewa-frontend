import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

    title = 'Angular-Interceptor';

    public message: string = null;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<ErrorDialogComponent>
    ) {
        this.message = data.message;
    }

    ngOnInit() {
    }

    Cancel() {
        this.dialogRef.close();
    }

}
