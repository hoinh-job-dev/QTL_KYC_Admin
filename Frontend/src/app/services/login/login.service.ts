import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import global = require('./../../global');

@Injectable()
export class HttpLoginService {

    private _logInUrl: string = global.logInUrl;
    private _logOutUrl: string = global.logOutUrl;

    constructor(private _http: Http) { }

    /**
     * Login
     */
    login(username: string, password: string) {
        var data = {
            "username": username,
            "password": password,
        };

        return this._http.post(this._logInUrl, data, global.requestOptions("post"))
            .map(res => res.json())
            .catch(global.handleError);
    }

    /**
     * Logout
     */
    logout() {
        return this._http.get(this._logOutUrl, global.requestAuthorizationOptions("get"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }
}