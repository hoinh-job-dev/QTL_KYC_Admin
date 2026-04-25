import { Component } from '@angular/core';
import { Router } from '@angular/router';

import global = require('./../../global');

declare let $: any;


@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [],
})

export class DashboardComponent {

    title: string;

    constructor(private _router: Router) {
        this.title = "Dashboard";
    }

}