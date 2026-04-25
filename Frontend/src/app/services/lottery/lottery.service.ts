import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import global = require('./../../global');

@Injectable()
export class HttpLotteryService {

    private _getRequestHistoryUrl: string = global.getRequestHistoryUrl;
    private _getWinningHistoryUrl: string = global.getWinningHistoryUrl;
    private _payPrizesUrl: string = global.payPrizesUrl;

    constructor(private _http: Http) { }


    /**
     * Get request history
     */
    getRequestHistory(){
        return this._http.get(this._getRequestHistoryUrl, global.requestAuthorizationOptions("get"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Get winning history
     */
    getWinningHistory() {
        return this._http.get(this._getWinningHistoryUrl, global.requestAuthorizationOptions("get"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

    /**
     * Pay prizes
     */
    payPrizes(email: any, pay: any) {
        var data = {
            email: email,
            pay: pay
        }

        return this._http.post(this._payPrizesUrl, data, global.requestAuthorizationOptions("post"))
            .map(res => res.json())
            .catch(global.handleAuthorizationError);
    }

}