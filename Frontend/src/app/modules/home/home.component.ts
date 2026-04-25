import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpLoginService } from './../../services/login/login.service';

import global = require('./../../global');

declare let $: any;


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: [],
})

export class HomeComponent {

    isLogin: any;
    username: any;
    password: any;

    constructor(private _router: Router, private _loginService: HttpLoginService) {
        this.isLogin = global.isValidToken('token');
        this.username = null;
        this.password = null;
    }

    /**
    * Login
    */
    login() {
        this._loginService.login(this.username, this.password).subscribe(
            data => {
                if (data.state != "success") {
                    console.log(data.error);
                    this._router.navigate(["/home"]);
                    return;
                }
                this.isLogin = true;
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('admin', data.data.username);
                localStorage.setItem('role', data.data.role);
                global.set_headers_authorization();
                this._router.navigate(["/dashboard"]);
            },
            error => console.log(error)
        );
    }
}