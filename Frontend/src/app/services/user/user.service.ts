import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import global = require('./../../global');

@Injectable()
export class HttpUserService {

    private _getUserListUrl: string = global.getUserListUrl;
    private _getUserInfoUrl: string = global.getUserInfoUrl;
    private _verifyUserUrl: string = global.verifyUserUrl;
    private _getVerifyListUrl: string = global.getVerifyListUrl;
    private _modifyUserUrl: string = global.modifyUserUrl;
    private _activeUserUrl: string = global.activeUserUrl;
    private _deactiveUserUrl: string = global.deactiveUserUrl;
    private _addUserUrl: string = global.addUserUrl;
    private _getImageUrl: string = global.getImageUrl;

    constructor(private _http: Http) { }

    /**
     * Get user list
     */
    getUserList() {
        return this._http.get(this._getUserListUrl, global.requestAuthorizationOptions("get"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Get user info
     */
    getUserInfo(email: any) {
        var data = {
            email: email
        }

        return this._http.post(this._getUserInfoUrl, data, global.requestAuthorizationOptions("post"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Verify user
     */
    verifyUser(email: string, verified: boolean) {
        var data = {
            email: email,
            verified: verified
        }

        return this._http.post(this._verifyUserUrl, data, global.requestAuthorizationOptions("post"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Get verify list
     */
    getVerifyList() {
        return this._http.get(this._getVerifyListUrl, global.requestAuthorizationOptions("get"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Modify user
     */
    modifyUser(email: string, datajson: any) {
        var data = {
            email: email,
            datajson: datajson
        }

        return this._http.post(this._modifyUserUrl, data, global.requestAuthorizationOptions("post"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Active user
     */
    activeUser(email: string) {
        var data = {
            email: email
        }

        return this._http.post(this._activeUserUrl, data, global.requestAuthorizationOptions("post"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Deactive user
     */
    deactiveUser(email: string) {
        var data = {
            email: email
        }

        return this._http.post(this._deactiveUserUrl, data, global.requestAuthorizationOptions("post"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Add user
     */
    addUser(email: string, datajson: any) {
        var data = datajson;
        data.email = email;

        return this._http.post(this._addUserUrl, data, global.requestAuthorizationOptions("post"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Get image
     */
    getImage(image: string) {
        return this._getImageUrl + '/' + image + '?access_token=' + localStorage.getItem('token');
    }

}