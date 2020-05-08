import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StorageService } from '../../core/services/storage.service';
import { UpdatePasswordComponent } from 'src/app/shared/components/update-password/update-password.component';

@Component({
    selector: 'app-booth',
    templateUrl: './booth.component.html',
    styleUrls: ['./booth.component.scss']
})
export class BoothComponent implements OnInit {

    constructor(
        private storage: StorageService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        const isVerified = this.storage.getCurrentUserVerified();
        const skipUpdatePassword = this.storage.getSkipUpdatePassword();
        if(isVerified === 'false' && !skipUpdatePassword) {
            this.dialog.open(UpdatePasswordComponent, {
                data: {showCurrentPassword: false}
            });
        }
    }

}
