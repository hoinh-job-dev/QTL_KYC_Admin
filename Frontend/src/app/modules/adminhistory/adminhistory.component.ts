import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HttpAdminService } from './../../services/admin/admin.service';

import global = require('./../../global');
import { PaginationComponent } from './../pagination/pagination.component';

declare let $: any;


@Component({
    selector: 'adminhistory',
    templateUrl: 'adminhistory.component.html',
    styleUrls: [],
})

export class AdminHistoryComponent {

    @ViewChild(PaginationComponent) _paginationComponent: PaginationComponent

    title: string;
    history: any;
    showlist: any;

    numberofhistory: number;
    numberofshow: number;
    listnumberofshow: any;
    starting: number;
    ending: number;

    constructor(private _router: Router, private _httpAdminService: HttpAdminService) {
        this.title = "Admin History";
        this.listnumberofshow = global.stepPagination;
        this.numberofshow = this.listnumberofshow[0];
        this.getAllHistory();
    }

    getAllHistory() {
        this._httpAdminService.getAllHistory().subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                this.history = data.data;
                this.countUser();
                this.initializePagination();
                this.getShowList();
            },
            error => console.log(error)
        )
    }

    countUser() {
        this.numberofhistory = this.history.length;
    }

    setNumberOfShow(n: number) {
        this.numberofshow = n;
        this.initializePagination();
    }

    getShowList() {
        this.showlist = [];
        for (var i = 0; i < this.numberofhistory; i++) {
            if (i >= this.starting && i < this.ending) {
                this.showlist.push(this.history[i]);
            }
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
        this._paginationComponent.setParams(this.numberofhistory, this.numberofshow)
    }

}