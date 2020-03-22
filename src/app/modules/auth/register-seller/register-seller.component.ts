import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { regex } from '../../core/constants';

@Component({
    selector: 'app-register-seller',
    templateUrl: './register-seller.component.html',
    styleUrls: ['./register-seller.component.scss']
})
export class RegisterSellerComponent implements OnInit {

    @Input() registerAs: string;
    @Output() cancel = new EventEmitter<any>();

    public registerSellerForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.registerSellerForm = new FormGroup(
            {
                name: new FormControl(null, Validators.required),
                phone: new FormControl(null, [Validators.required, Validators.pattern(regex.mobileNo)]),
                email: new FormControl(null, [Validators.required, Validators.pattern(regex.emailId)]),
                address: new FormControl(null, [Validators.required, Validators.pattern(regex.address)])
            }
        );
    }

    onRegister() {
        console.log('Regsiter Seller');
    }

    public onCancel() {
        this.cancel.emit();
    }

}
