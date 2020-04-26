import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    public loader: any = {
        show: false,
        pendingService: 0
    };

    constructor() { }

    public showLoader() {
        this.loader.show = true;
        this.loader.pendingService += 1;
    }

    public hideLoader() {
        this.loader.pendingService -= 1;
        if (this.loader.pendingService <= 0) {
            this.loader.show = false;
        }
    }
}
