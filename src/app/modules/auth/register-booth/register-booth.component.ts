import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { regex } from '../../core/constants';
import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { LocationComponent } from 'src/app/shared/location/location.component';
import { StorageService } from '../../core/services/storage.service';

@Component({
    selector: 'app-register-booth',
    templateUrl: './register-booth.component.html',
    styleUrls: ['./register-booth.component.scss'],
})
export class RegisterBoothComponent implements OnInit {

    @Input() registerAs: string;
    @Output() cancel = new EventEmitter<any>();

    public registerBoothForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
        private loaderService: LoaderService,
        private dialog: MatDialog,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.registerBoothForm = new FormGroup(
            {
                name: new FormControl(null, Validators.required),
                email: new FormControl(null, [Validators.required, Validators.pattern(regex.emailId)]),
                boothName: new FormControl(null, Validators.required),
                address: new FormControl(null, [Validators.required, Validators.pattern(regex.address)]),
                phone: new FormControl(null, [Validators.required, Validators.pattern(regex.mobileNo)])
            }
        );
    }

    public onRegister() {
        const dialogRaf = this.dialog.open(LocationComponent);
        dialogRaf.afterClosed().subscribe(
            coords => {
                if (coords !== undefined) {
                    this.registerBooth(coords);
                } else {
                    const currenLang = this.storage.getCurrentLang();
                    if (currenLang === 'hi') {
                        this.dialog.open(ErrorDialogComponent, {
                            data: { message: 'आपने मानचित्र पर कोई स्थान नहीं चुना है। कृपया चुने!' }
                        });
                    } else {
                        this.dialog.open(ErrorDialogComponent, {
                            data: { message: 'You have not choosen a location on the map. Please choose!' }
                        });
                    }
                }
            }
        )
    }

    public onCancel() {
        this.cancel.emit();
    }

    private registerBooth(coords: any) {
        this.loaderService.showLoader();
        this.authService.register(this.registerBoothForm, 'booth', coords).subscribe(
            (response: any) => {
                this.loaderService.hideLoader();
                const dialogRef = this.dialog.open(SuccessDialogComponent, {
                    data: response
                });
                dialogRef.afterClosed().subscribe(change => {
                    this.router.navigateByUrl('/kisan/login');
                });
            },
            error => {
                this.loaderService.hideLoader();
                this.dialog.open(ErrorDialogComponent, {
                    data: error.error
                });
            },
            () => { }
        );
    }

}
