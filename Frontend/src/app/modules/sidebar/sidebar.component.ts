import { Component } from '@angular/core';
import { Router } from '@angular/router';

import global = require('./../../global');

declare let $: any;


@Component({
    selector: 'sidebar-left',
    templateUrl: 'sidebar.component.html',
    styleUrls: [],
})

export class SidebarComponent {

    constructor(private _router: Router) { }

    dropdown(id: any) {
        var accordion = $('#accordion');
        var link = $('#' + id);
        var submenu = link.next();
        submenu.slideToggle();
        link.parent().toggleClass('open');
        accordion.find('.submenu').not(submenu).slideUp().parent().removeClass('open');
    }

}