import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import global = require('./../../global');

@Injectable()
export class HttpAdminService {

    private _changePasswordUrl: string = global.changePasswordUrl;
    private _addAdminUrl: string = global.addAdminUrl;
    private _getAllHistoryUrl: string = global.getAllHistoryUrl;
    private _getMyHistoryUrl: string = global.getMyHistoryUrl;
    private _getAdminListUrl: string = global.getAdminListUrl;
    private _deleteAdminUrl: string = global.deleteAdminUrl;

    constructor(private _http: Http) { }

    /**
     * Change password
     */
    changePassword(oldPassword: string, newPassword: string) {
        var data = {
            "oldPassword": oldPassword,
            "newPassword": newPassword
        };

        return this._http.post(this._changePasswordUrl, data, global.requestAuthorizationOptions("post"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Add admin
     */
    addAdmin(username: string, password: string, firstname: string, lastname: string, address: string, role: string) {
        var data = {
            "username": username,
            "password": password,
            "firstname": firstname,
            "lastname": lastname,
            "address": address,
            "role": role
        };

        return this._http.post(this._addAdminUrl, data, global.requestAuthorizationOptions("post"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Get all history
     */
    getAllHistory() {
        return this._http.get(this._getAllHistoryUrl, global.requestAuthorizationOptions("get"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Get my history
     */
    getMyHistory() {
        return this._http.get(this._getMyHistoryUrl, global.requestAuthorizationOptions("get"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Get admin list
     */
    getAdminList() {
        return this._http.get(this._getAdminListUrl, global.requestAuthorizationOptions("get"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Delete admin
     */
    deleteAdmin(username: any) {
        var data = {
            "username": username,
        };
        return this._http.post(this._deleteAdminUrl, data, global.requestAuthorizationOptions("post"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

}