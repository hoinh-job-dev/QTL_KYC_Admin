import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpLotteryService } from './../../services/lottery/lottery.service';

import global = require('./../../global');
import { PaginationComponent } from './../pagination/pagination.component';

declare let $: any;


@Component({
    selector: 'lottery',
    templateUrl: 'lottery.component.html',
    styleUrls: [],
})

export class LotteryComponent {

    @ViewChild(PaginationComponent) _paginationComponent: PaginationComponent

    title: string;
    binding: string;
    winninghistory: any;
    showlist: any;

    numberofuser: number;
    numberofshow: number;
    listnumberofshow: any;
    starting: number;
    ending: number;

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _httpLotteryService: HttpLotteryService) {
        this.title = "Winning histoty";
        this.listnumberofshow = global.stepPagination;
        this.numberofshow = this.listnumberofshow[0];
    }

    ngOnInit() {
        this.binding = this._activatedRoute.snapshot.params['binding'];
        this._router.events.subscribe((event) => {
            this.binding = this._activatedRoute.snapshot.params['binding'];
            this.getWinningHistory()
        });
    }


    /**
     * Get wining history
     */
    getWinningHistory() {
        this._httpLotteryService.getWinningHistory().subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                this.winninghistory = this.filterWinningHistory(data.data);
                this.countUser();
                this.initializePagination();
                this.getShowList();
            },
            error => console.log(error)
        )
    }
    filterWinningHistory(data: any) {
        if (this.binding == 'all') {
            var temp: any[];
            temp = [];
            for (var i = 0; i < data.length; i++) {
                data[i].createdAt = global.convertDate(data[i].createdAt);
                temp.push(data[i]);
            }
            return temp;
        }
        if (this.binding == 'verify') {
            var temp = [];
            for (var i = 0; i < data.length; i++) {
                if (!data[i].isPaid) {
                    data[i].createdAt = global.convertDate(data[i].createdAt);
                    temp.push(data[i]);
                }
            }
            return temp;
        }
        if (this.binding == 'paid') {
            var temp = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].isPaid) {
                    data[i].createdAt = global.convertDate(data[i].createdAt);
                    temp.push(data[i]);
                }
            }
            return temp;
        }
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
        this.numberofuser = this.winninghistory.length;
    }
    setNumberOfShow(n: number) {
        this.numberofshow = n;
        this.initializePagination();
    }
    getShowList() {
        this.showlist = [];
        for (var i = 0; i < this.numberofuser; i++) {
            if (i >= this.starting && i < this.ending) {
                this.showlist.push(this.winninghistory[i]);
            }
        }
    }

    /**
     * Pay prizes
     */
    payPrizes(email: any, is: any) {
        this._httpLotteryService.payPrizes(email, is).subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                this.getWinningHistory();
            },
            error => console.log(error)
        )
    }

}