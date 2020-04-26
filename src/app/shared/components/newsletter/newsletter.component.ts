import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NewsletterService } from 'src/app/modules/core/services/newsletter.service';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

    newsLetterForm: FormGroup;

    constructor(private newsLetterService: NewsletterService) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.newsLetterForm = new FormGroup(
            {
                email: new FormControl(null, [Validators.required, Validators.email])
            }
        );
    }

    public onSubscribe() {
        this.newsLetterService.newsletterSubscribe(this.newsLetterForm).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            },
            () => { }
        );
    }

}
