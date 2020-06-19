import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { regex } from '../../../modules/core/constants';
import { LoaderService } from 'src/app/modules/core/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MiscellaneousService } from 'src/app/modules/core/services/miscellaneous.service';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

    newsLetterForm: FormGroup;

    constructor(
        private miscService: MiscellaneousService,
        private loaderService: LoaderService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.newsLetterForm = new FormGroup(
            {
                email: new FormControl(null, [Validators.required, Validators.pattern(regex.emailId)])
            }
        );
    }

    public onSubscribe() {
        this.loaderService.showLoader();
        this.miscService.newsletterSubscribe(this.newsLetterForm).subscribe(
            response => {
                this.loaderService.hideLoader();
                this.dialog.open(SuccessDialogComponent, {
                    data: response
                });
            },
            error => {
                this.loaderService.hideLoader();
                this.snackBar.open(error.error.message);
            },
            () => { }
        );
    }

}
