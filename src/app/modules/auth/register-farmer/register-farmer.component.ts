import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { regex } from '../../core/constants';

@Component({
    selector: 'app-register-farmer',
    templateUrl: './register-farmer.component.html',
    styleUrls: ['./register-farmer.component.scss']
})
export class RegisterFarmerComponent implements OnInit {

    @Input() registerAs: string;
    @Output() cancel = new EventEmitter<any>();

    public registerFarmerForm: FormGroup;

    constructor() { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.registerFarmerForm = new FormGroup(
            {
                name: new FormControl(null, Validators.required),
                phone: new FormControl(null, [Validators.required, Validators.pattern(regex.mobileNo)]),
                email: new FormControl(null, [Validators.required, Validators.pattern(regex.emailId)]),
                address: new FormControl(null, [Validators.required, Validators.pattern(regex.address)])
            }
        );
    }

    onRegister() {
        console.log('Register Farmer');
    }

    public onCancel() {
        this.cancel.emit();
    }

}
