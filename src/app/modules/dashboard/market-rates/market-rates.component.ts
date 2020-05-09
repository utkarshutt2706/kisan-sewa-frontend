import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from '../../core/services/storage.service';

@Component({
    selector: 'app-market-rates',
    templateUrl: './market-rates.component.html',
    styleUrls: ['./market-rates.component.scss']
})
export class MarketRatesComponent implements OnInit {

    public marketRate = [
        {
            nameEn: 'Tomato',
            nameHi: 'टमाटर',
            localRate: 30,
            avgRate: 40
        },
        {
            nameEn: 'Potato',
            nameHi: 'आलू',
            localRate: 30,
            avgRate: 40
        },
        {
            nameEn: 'Onion',
            nameHi: 'प्याज',
            localRate: 30,
            avgRate: 40
        },
        {
            nameEn: 'Wheat',
            nameHi: 'गेहूँ',
            localRate: 30,
            avgRate: 40
        },
        {
            nameEn: 'Rice',
            nameHi: 'चावल',
            localRate: 30,
            avgRate: 40
        },
        {
            nameEn: 'Cucumber',
            nameHi: 'खीरा',
            localRate: 30,
            avgRate: 40
        },
        {
            nameEn: 'Cabbage',
            nameHi: 'पत्ता गोभी',
            localRate: 30,
            avgRate: 40
        }
    ];

    public displayedColumns = ['sNo', 'name', 'localRate', 'avgRate'];
    public dataSource = new MatTableDataSource(this.marketRate);

    constructor(public storage: StorageService) { }

    ngOnInit(): void {
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
