import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HttpUserService } from './../../services/user/user.service';

import global = require('./../../global');
import { PaginationComponent } from './../pagination/pagination.component';

declare let $: any;


@Component({
    selector: 'userlist',
    templateUrl: 'userlist.component.html',
    styleUrls: [],
})

export class UserListComponent {

    @ViewChild(PaginationComponent) _paginationComponent: PaginationComponent

    title: string;
    userlist: any;
    showlist: any;

    numberofuser: number;
    numberofshow: number;
    listnumberofshow: any;
    starting: number;
    ending: number;

    constructor(private _router: Router, private _httpUserService: HttpUserService) {
        this.title = "User List";
        this.listnumberofshow = global.stepPagination;
        this.numberofshow = this.listnumberofshow[0];
        this.getUserList();
    }

    getUserList() {
        this._httpUserService.getUserList().subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                this.userlist = data.data;
                this.countUser();
                this.initializePagination();
                this.getShowList();
            },
            error => console.log(error)
        )
    }

    countUser() {
        this.numberofuser = this.userlist.length;
    }

    setNumberOfShow(n: number) {
        this.numberofshow = n;
        this.initializePagination();
    }

    getShowList() {
        this.showlist = [];
        for (var i = 0; i < this.numberofuser; i++) {
            if (i >= this.starting && i < this.ending) {
                this.showlist.push(this.userlist[i]);
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
        this._paginationComponent.setParams(this.numberofuser, this.numberofshow)
    }

}