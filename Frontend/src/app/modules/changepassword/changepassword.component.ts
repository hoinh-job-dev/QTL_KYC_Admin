import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpAdminService } from './../../services/admin/admin.service';

import global = require('./../../global');

declare let $: any;


@Component({
    selector: 'changepassword',
    templateUrl: 'changepassword.component.html',
    styleUrls: [],
})

export class ChangePasswordComponent {

    title: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;

    _comparePassword: boolean;
    _atLeastOneLowerCase: boolean;
    _atLeastOneUpperCase: boolean;
    _atLeastOneNumber: boolean;
    _atLeastOneSpecialCharacter: boolean;
    _isValidPassword: boolean;
    _isLegal: boolean;

    constructor(private _router: Router, private _httpAdminService: HttpAdminService) {
        this.title = "Change Password";
        this.oldPassword = null;
        this.newPassword = null;
        this.confirmPassword = null;
        this._comparePassword = true;
    }

    changePassword() {
        this._httpAdminService.changePassword(this.oldPassword, this.newPassword).subscribe(
            data => {
                if (data.state != "success") return console.log(data.error);
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
                localStorage.removeItem("role");
                this._router.navigate(['/home']);
            },
            error => console.log(error)
        )
    }

    showPassword(id: any) {
        var input = $('#' + id);
        var i = input.next('a').children('span').children('i');
        if (i.attr('class') == 'fa fa-eye') {
            i.removeClass('fa fa-eye').addClass('fa fa-eye-slash');
        }
        else {
            i.removeClass('fa fa-eye-slash').addClass('fa fa-eye');
        }
        if (input.prop('type') == 'password') {
            return input.prop('type', 'text');
        }
        return input.prop('type', 'password');
    }

    comparePassword() {
        if (this.newPassword !== this.confirmPassword) return false;
        return true;
    }

    cancel() {
        this.oldPassword = null;
        this.newPassword = null;
        this.confirmPassword = null;
        this.check();
    }

    check() {
        this._comparePassword = this.comparePassword();
        this._atLeastOneLowerCase = global.atLeastOneLowerCase(this.newPassword);
        this._atLeastOneUpperCase = global.atLeastOneUpperCase(this.newPassword);
        this._atLeastOneNumber = global.atLeastOneNumber(this.newPassword);
        this._atLeastOneSpecialCharacter = global.atLeastOneSpecialCharacter(this.newPassword);
        this._isValidPassword = global.isValidPassword(this.newPassword);
        if (
            !this._comparePassword ||
            !this._atLeastOneLowerCase ||
            !this._atLeastOneUpperCase ||
            !this._atLeastOneNumber ||
            !this._atLeastOneSpecialCharacter ||
            !this._isValidPassword
        ) this._isLegal = false;
        else this._isLegal = true;
    }
}