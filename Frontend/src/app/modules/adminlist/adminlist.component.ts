import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HttpAdminService } from './../../services/admin/admin.service';

import global = require('./../../global');
import { PaginationComponent } from './../pagination/pagination.component';

declare let $: any;


@Component({
    selector: 'adminlist',
    templateUrl: 'adminlist.component.html',
    styleUrls: [],
})

export class AdminListComponent {

    @ViewChild(PaginationComponent) _paginationComponent: PaginationComponent

    title: string;
    adminlist: any;
    showlist: any;

    numberofadmin: number;
    numberofshow: number;
    listnumberofshow: any;
    starting: number;
    ending: number;

    constructor(private _router: Router, private _httpAdminService: HttpAdminService) {
        this.title = "Admin List";
        this.listnumberofshow = global.stepPagination;
        this.numberofshow = this.listnumberofshow[0];
        this.getAdminList();
    }

    getAdminList() {
        this._httpAdminService.getAdminList().subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                this.adminlist = data.data;
                this.countUser();
                this.initializePagination();
                this.getShowList();
            },
            error => console.log(error)
        )
    }

    deleteAdmin(username: any) {
        this._httpAdminService.deleteAdmin(username).subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                this.getAdminList();
            },
            error => console.log(error)
        )
    }

    countUser() {
        this.numberofadmin = this.adminlist.length;
    }

    setNumberOfShow(n: number) {
        this.numberofshow = n;
        this.initializePagination();
    }

    getShowList() {
        this.showlist = [];
        for (var i = 0; i < this.numberofadmin; i++) {
            if (i >= this.starting && i < this.ending) {
                this.showlist.push(this.adminlist[i]);
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
        this._paginationComponent.setParams(this.numberofadmin, this.numberofshow)
    }
}