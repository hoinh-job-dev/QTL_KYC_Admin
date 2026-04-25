import { Component, Input, Output, EventEmitter } from '@angular/core';

import global = require('./../../global');

declare let $: any;


@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: [],
})

export class PaginationComponent {

    @Output() notify = new EventEmitter();

    total_length: number;
    number_of_show: number;
    number_of_pages: number;
    list_of_page: any;
    current_page: number;
    starting_entry: number;

    constructor() { }

    setParams(total_length: any, number_of_show: any) {
        this.total_length = total_length;
        this.number_of_show = number_of_show;
        this.number_of_pages = Math.ceil(this.total_length / this.number_of_show);
        this.list_of_page = [];
        for (var i = 0; i < this.number_of_pages; i++) this.list_of_page.push(i);
        this.current_page = 0;
        this.starting_entry = 0;
        this.emitParams();
    }

    emitParams() {
        var data = {
            total_length: this.total_length,
            number_of_show: this.number_of_show,
            number_of_pages: this.number_of_pages,
            current_page: this.current_page,
            starting_entry: this.starting_entry,
        }
        this.notify.emit(data);
    }

    next() {
        if (this.starting_entry + this.number_of_show >= this.total_length) return;
        this.current_page += 1;
        this.starting_entry = this.number_of_show * this.current_page;
        this.emitParams();
    }

    prev() {
        if (this.starting_entry - this.number_of_show < 0) return;
        this.current_page -= 1;
        this.starting_entry = this.number_of_show * this.current_page;
        this.emitParams();
    }

    step(i: number) {
        this.current_page = i;
        this.starting_entry = this.number_of_show * this.current_page;
        this.emitParams();
    }

}