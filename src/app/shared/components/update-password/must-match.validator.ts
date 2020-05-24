import { AbstractControl } from '@angular/forms';

export class MustMatch {
    static MatchPassword(control: AbstractControl) {
        const password = control.get('newPass').value;
        const confirmPassword = control.get('confirmPass').value;
        if (password !== confirmPassword) {
            control.get('confirmPass').setErrors({ ConfirmPassword: true });
        } else {
            return null;
        }
    }
}