import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpAdminService } from './../../services/admin/admin.service';

import global = require('./../../global');

declare let $: any;

@Component({
    selector: 'addadmin',
    templateUrl: 'addadmin.component.html',
    styleUrls: [],
})
export class AddAdminComponent {

    title: string;
    firstname: string;
    lastname: string;
    username: string;
    newPassword: string;
    confirmPassword: string;
    role: string;
    address: string;

    _comparePassword: boolean;
    _atLeastOneLowerCase: boolean;
    _atLeastOneUpperCase: boolean;
    _atLeastOneNumber: boolean;
    _atLeastOneSpecialCharacter: boolean;
    _isValidPassword: boolean;
    _isLegal: boolean;
    _isValidFirstname: boolean;
    _isValidLastname: boolean;
    _isValidUsername: boolean;
    _isValidAddress: boolean;


    constructor(private _router: Router, private _httpAdminService: HttpAdminService) {
        this.title = "Add Admin";
        this.firstname = null;
        this.lastname = null;
        this.username = null;
        this.newPassword = null;
        this.confirmPassword = null;
        this._comparePassword = true;
        this.role = 'operator';
        this.address = null;
    }

    addAdmin() {
        if (!this._isLegal) return;
        this._httpAdminService.addAdmin(this.username, this.newPassword, this.firstname, this.lastname, this.address, this.role).subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                console.log(data)
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
        this.firstname = null;
        this.lastname = null;
        this.username = null;
        this.newPassword = null;
        this.confirmPassword = null;
        this._comparePassword = true;
        this.role = 'operator';
        this.address = null;
        this.check();
    }

    check() {
        this._comparePassword = this.comparePassword();
        this._atLeastOneLowerCase = global.atLeastOneLowerCase(this.newPassword);
        this._atLeastOneUpperCase = global.atLeastOneUpperCase(this.newPassword);
        this._atLeastOneNumber = global.atLeastOneNumber(this.newPassword);
        this._atLeastOneSpecialCharacter = global.atLeastOneSpecialCharacter(this.newPassword);
        this._isValidPassword = global.isValidPassword(this.newPassword);
        this.isValidFirstname();
        this.isValidLastname();
        this.isValidUsername();
        this.isValidAddress();
        if (
            !this._comparePassword ||
            !this._atLeastOneLowerCase ||
            !this._atLeastOneUpperCase ||
            !this._atLeastOneNumber ||
            !this._atLeastOneSpecialCharacter ||
            !this._isValidPassword ||
            !this._isValidFirstname ||
            !this._isValidLastname ||
            !this._isValidUsername ||
            !this._isValidAddress
        ) this._isLegal = false;
        else this._isLegal = true;
    }

    type(type: string) {
        this.role = type;
    }

    isValidFirstname() {
        if (typeof this.firstname == 'string' && this.firstname.length > 0) this._isValidFirstname = true;
        else this._isValidFirstname = false;
    }

    isValidLastname() {
        if (typeof this.lastname == 'string' && this.lastname.length > 0) this._isValidLastname = true;
        else this._isValidLastname = false;
    }

    isValidUsername() {
        this._isValidUsername = global.isValidDisplayname(this.username);
    }

    isValidAddress() {
        if (typeof this.address == 'string' && this.address.length > 0) this._isValidAddress = true;
        else this._isValidAddress = false;
    }

}