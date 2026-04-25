import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class IsNotLoggedIn implements CanActivate {

    constructor(private _router: Router) { }

    /**
     * Check login
     */
    canActivate() {
        if (!tokenNotExpired('token')) {
            return true;
        }
        this._router.navigate(['/dashboard']);
        return false;
    }

}