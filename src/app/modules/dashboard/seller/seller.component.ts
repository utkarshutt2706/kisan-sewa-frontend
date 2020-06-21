import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { LoaderService } from '../../core/services/loader.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
    selector: 'app-seller',
    templateUrl: './seller.component.html',
    styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

    public seller: any;
    public currentUser: any;
    private param: any;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private dialog: MatDialog,
        private loaderService: LoaderService,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        const sellerId = this.route.snapshot.params.id;
        this.getSeller(sellerId);
        this.currentUser = JSON.parse(this.storage.getCurrentUser());
    }

    private getSeller(sellerId: string) {
        this.loaderService.showLoader();
        this.userService.getUserById(sellerId).subscribe(
            seller => {
                this.loaderService.hideLoader();
                this.seller = seller;
                this.param = {
                    currentUser: this.currentUser._id,
                    reportedUser: this.seller._id
                }
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

    public reportSeller() {
        this.loaderService.showLoader();
        this.userService.reportUser(this.param).subscribe(
            result => {
                this.seller = result;
                this.param = {
                    currentUser: this.currentUser._id,
                    reportedUser: this.seller._id
                }
                this.loaderService.hideLoader();
            },
            error => {
                this.loaderService.hideLoader();
                this.dialog.open(ErrorDialogComponent, {
                    data: error.error
                });
            },
            () => {}
        );
    }

    public unReportSeller() {
        this.loaderService.showLoader();
        this.userService.unReportUser(this.param).subscribe(
            result => {
                this.seller = result;
                this.param = {
                    currentUser: this.currentUser._id,
                    reportedUser: this.seller._id
                }
                this.loaderService.hideLoader();
            },
            error => {
                this.loaderService.hideLoader();
                this.dialog.open(ErrorDialogComponent, {
                    data: error.error
                });
            },
            () => {}
        );
    }

    public followSeller() {
        this.loaderService.showLoader();
        this.userService.followUser(this.param).subscribe(
            result => {
                this.seller = result;
                this.param = {
                    currentUser: this.currentUser._id,
                    reportedUser: this.seller._id
                }
                this.loaderService.hideLoader();
            },
            error => {
                this.loaderService.hideLoader();
                this.dialog.open(ErrorDialogComponent, {
                    data: error.error
                });
            },
            () => {}
        );
    }

    public unFollowSeller() {
        this.loaderService.showLoader();
        this.userService.unFollowUser(this.param).subscribe(
            result => {
                this.seller = result;
                this.param = {
                    currentUser: this.currentUser._id,
                    reportedUser: this.seller._id
                }
                this.loaderService.hideLoader();
            },
            error => {
                this.loaderService.hideLoader();
                this.dialog.open(ErrorDialogComponent, {
                    data: error.error
                });
            },
            () => {}
        );
    }

}
