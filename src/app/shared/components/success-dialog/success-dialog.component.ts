import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-success-dialog',
    templateUrl: './success-dialog.component.html',
    styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<SuccessDialogComponent>,
        private router: Router
    ) { }

    ngOnInit() {
    }

    public close() {
        this.dialogRef.close();
        this.router.navigate(['/']);
    }

}
