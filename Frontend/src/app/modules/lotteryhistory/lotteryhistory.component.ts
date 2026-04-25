import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HttpLotteryService } from './../../services/lottery/lottery.service';

import global = require('./../../global');
import { PaginationComponent } from './../pagination/pagination.component';

declare let $: any;


@Component({
    selector: 'lotteryhistory',
    templateUrl: 'lotteryhistory.component.html',
    styleUrls: [],
})

export class LotteryHistoryComponent {

    @ViewChild(PaginationComponent) _paginationComponent: PaginationComponent

    title: string;
    binding: string;
    requesthistory: any;
    showlist: any;

    numberofuser: number;
    numberofshow: number;
    listnumberofshow: any;
    starting: number;
    ending: number;

    constructor(private _router: Router, private _httpLotteryService: HttpLotteryService) {
        this.title = "Request histoty";
        this.listnumberofshow = global.stepPagination;
        this.numberofshow = this.listnumberofshow[0];
    }

    ngOnInit() {
        this.getRequestHistory();
    }


    /**
     * Get request history
     */
    getRequestHistory() {
        this._httpLotteryService.getRequestHistory().subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                this.requesthistory = this.filterRequestHistory(data.data);
                this.countUser();
                this.initializePagination();
                this.getShowList();
            },
            error => console.log(error)
        )
    }
    filterRequestHistory(data: any) {
        console.log(data)
        return data;
    }


    /**
     * Pagination
     */
    handleNotify(data: any) {
        this.starting = data.starting_entry;
        this.ending = this.starting + this.numberofshow;
        this.getShowList();
    }
    initializePagination() {
        this._paginationComponent.setParams(this.numberofuser, this.numberofshow)
    }
    countUser() {
        this.numberofuser = this.requesthistory.length;
    }
    setNumberOfShow(n: number) {
        this.numberofshow = n;
        this.initializePagination();
    }
    getShowList() {
        this.showlist = [];
        for (var i = 0; i < this.numberofuser; i++) {
            if (i >= this.starting && i < this.ending) {
                this.showlist.push(this.requesthistory[i]);
            }
        }
    }

}