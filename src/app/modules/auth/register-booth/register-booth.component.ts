import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { regex } from '../../core/constants';

@Component({
    selector: 'app-register-booth',
    templateUrl: './register-booth.component.html',
    styleUrls: ['./register-booth.component.scss']
})
export class RegisterBoothComponent implements OnInit {

    @Input() registerAs: string;
    @Output() cancel = new EventEmitter<any>();

    public registerBoothForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.registerBoothForm = new FormGroup(
            {
                name: new FormControl(null, Validators.required),
                email: new FormControl(null, [Validators.required, Validators.pattern(regex.emailId)]),
                boothName: new FormControl(null, Validators.required),
                boothAddress: new FormControl(null, [Validators.required, Validators.pattern(regex.address)]),
                phone: new FormControl(null, [Validators.required, Validators.pattern(regex.mobileNo)])
            }
        );
    }

    public onRegister() {
        console.log('register');
    }

    public onCancel() {
        this.cancel.emit();
    }

}
