import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

    public lat: any;
    public lon: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<LocationComponent>
    ) { }

    ngOnInit(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                this.lon = +position.coords.longitude;
                this.lat = +position.coords.latitude;
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
        console.log(this.lon);
    }

    public placeMarker(event) {
        this.lat = event.coords.lat;
        this.lon = event.coords.lng;
    }

    public onCancel() {
        this.dialogRef.close();
    }

    public onSubmit() {
        this.dialogRef.close({ lat: this.lat, lon: this.lon });
    }

}
