import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { HttpLoginService } from './../../services/login/login.service';

import global = require('./../../global');

declare let $: any;


@Component({
    selector: 'header',
    templateUrl: 'header.component.html',
    styleUrls: [],
})

export class HeaderComponent {

    @Input() title: string;
    admin: string;

    constructor(private _router: Router, private _loginService: HttpLoginService) {
        this.admin = localStorage.getItem('admin');
    }

    logout() {
        console.log('chay con')
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        localStorage.removeItem('role');
        this._loginService.logout().subscribe(
            data => {
                if (data.state != "success") return console.log(data.error);
                this._router.navigate(["/home"]);
            },
            error => console.log(error)
        );
    }
}