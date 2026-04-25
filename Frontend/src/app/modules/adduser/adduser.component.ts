import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpUserService } from './../../services/user/user.service';

import global = require('./../../global');

declare let $: any;


@Component({
    selector: 'adduser',
    templateUrl: 'adduser.component.html',
    styleUrls: [],
})

export class AddUserComponent {

    title: string;
    country_list: any;

    email: string;
    displayname: string;
    password: string;
    firstname: string;
    lastname: string;
    date_of_birth: any;
    sex: any;
    street1: string;
    state: string;
    city: string;
    country: string;
    postal_code: string;
    ethaddress: string;
    blackuser: boolean;
    read_only: boolean;

    _atLeastOneLowerCase: boolean;
    _atLeastOneUpperCase: boolean;
    _atLeastOneNumber: boolean;
    _atLeastOneSpecialCharacter: boolean;
    _isValidPassword: boolean;
    _isPasswordInput: boolean;
    _isLegalPassword: boolean;

    _isEmailInput: boolean;
    _isLegalEmail: boolean;

    _isDisplaynameInput: boolean;
    _isLegalDisplayname: boolean;

    _isDateInput: boolean;
    _isMonthInput: boolean;
    _isYearInput: boolean;
    _isLegalDateOfBirth: boolean;

    _isLegalSex: boolean;

    _isFirstnameInput: boolean;
    _isLastnameInput: boolean;
    _isStreet1Input: boolean;
    _isStateInput: boolean;
    _isCityInput: boolean;

    _isLegalCountry: boolean;

    _isPostalCodeInput: boolean;
    _isETHAddrInput: boolean;


    constructor(private _router: Router, private _httpUserService: HttpUserService) {
        this.title = "Add User";
        this.country_list = global.country_list;

        this.email = null;
        this.displayname = null;
        this.password = null;
        this.firstname = null;
        this.lastname = null;
        this.date_of_birth = {
            date: null,
            month: null,
            year: null,
            get: null
        };
        this._isLegalSex = true;
        this.sex = 'male';
        this.street1 = null;
        this.state = null;
        this.city = null;
        this.country = null;
        this.postal_code = null;
        this.ethaddress = null;
        this.blackuser = false;
        this.read_only = false;
    }


    /**
     * Button event
     */

    toogleBlackUser() {
        this.blackuser = !this.blackuser;
    }

    toogleAgent() {
        this.read_only = !this.read_only;
    }

    cancel() {
        this.email = null;
        this.displayname = null;
        this.password = null;
        this.firstname = null;
        this.lastname = null;
        this.date_of_birth = {
            date: null,
            month: null,
            year: null,
            get: null
        };
        this.sex = 'male';
        this.street1 = null;
        this.state = null;
        this.city = null;
        this.country = null;
        this.postal_code = null;
        this.ethaddress = null;
        this.blackuser = false;
        this.read_only = false;
    }

    addUser() {
        if (!this._isLegalEmail ||
            !this._isLegalPassword ||
            !this._isLegalDisplayname ||
            !this._isLegalDateOfBirth ||
            !this._isLegalSex ||
            !this._isFirstnameInput ||
            !this._isLastnameInput ||
            !this._isStreet1Input ||
            !this._isStateInput ||
            !this._isCityInput ||
            !this._isLegalCountry ||
            !this._isPostalCodeInput ||
            !this._isETHAddrInput
        ) return;
        var datajson = {
            displayname: this.displayname,
            password: this.password,
            date_of_birth: this.date_of_birth.get,
            sex: this.sex,
            firstname: this.firstname,
            lastname: this.lastname,
            read_only: this.read_only,
            street1: this.street1,
            state: this.state,
            city: this.city,
            postal_code: this.postal_code,
            country: this.country,
            ethaddress: this.ethaddress
        }
        this._httpUserService.addUser(this.email, datajson).subscribe(
            data => {
                console.log(data)
                if (data.state != 'success') return console.log(data.error);
                if (this.blackuser) {
                    this.deactiveUser();
                }
                else {
                    this.activeUser();
                }
                this._router.navigate(['/userlist']);
            },
            error => console.log(error)
        )
    }


    /**
     * Validation
     */

    checkPassword() {
        if (this.password) this._isPasswordInput = true;
        else this._isPasswordInput = false;
        this._atLeastOneLowerCase = global.atLeastOneLowerCase(this.password);
        this._atLeastOneUpperCase = global.atLeastOneUpperCase(this.password);
        this._atLeastOneNumber = global.atLeastOneNumber(this.password);
        this._atLeastOneSpecialCharacter = global.atLeastOneSpecialCharacter(this.password);
        this._isValidPassword = global.isValidPassword(this.password);
        if (
            !this._atLeastOneLowerCase ||
            !this._atLeastOneUpperCase ||
            !this._atLeastOneNumber ||
            !this._atLeastOneSpecialCharacter ||
            !this._isValidPassword
        ) this._isLegalPassword = false;
        else this._isLegalPassword = true;
    }

    checkEmail() {
        if (this.email) this._isEmailInput = true;
        else this._isEmailInput = false;
        this._isLegalEmail = global.isValidEmail(this.email);
    }

    checkDisplayname() {
        if (this.displayname) this._isDisplaynameInput = true;
        else this._isDisplaynameInput = false;
        this._isLegalDisplayname = global.isValidDisplayname(this.displayname);
    }

    checkDOB() {
        if (this.date_of_birth.date &&
            this.date_of_birth.date <= 31 &&
            this.date_of_birth.date >= 1) this._isDateInput = true;
        else this._isDateInput = false;
        if (this.date_of_birth.month &&
            this.date_of_birth.month <= 12 &&
            this.date_of_birth.month >= 1) this._isMonthInput = true;
        else this._isMonthInput = false;
        if (this.date_of_birth.year &&
            this.date_of_birth.year <= 2017 &&
            this.date_of_birth.year >= 1970) this._isYearInput = true;
        else this._isYearInput = false;
        this.date_of_birth.get = new Date(this.date_of_birth.month + '/' + this.date_of_birth.date + '/' + this.date_of_birth.year);
        if (this.date_of_birth.get.toString() == 'Invalid Date' ||
            !this._isDateInput ||
            !this._isMonthInput ||
            !this._isYearInput
        ) this._isLegalDateOfBirth = false;
        else this._isLegalDateOfBirth = true;
    }

    checkCountry() {
        if (!this.country) {
            this._isLegalCountry = false;
            return;
        }
        if (!global.isIn(this.country, this.country_list)) {
            this._isLegalCountry = false;
            return;
        }
        this._isLegalCountry = true;
        return;
    }

    checkSex() {
        if (!this.sex) {
            this._isLegalSex = false;
            return;
        }
        if (this.sex != 'male' && this.sex != 'female') {
            this._isLegalSex = false;
            return;
        }
        this._isLegalSex = true;
        return;
    }

    checkCommon() {
        if (this.firstname) this._isFirstnameInput = true;
        else this._isFirstnameInput = false;
        if (this.lastname) this._isLastnameInput = true;
        else this._isLastnameInput = false;
        if (this.street1) this._isStreet1Input = true;
        else this._isStreet1Input = false;
        if (this.state) this._isStateInput = true;
        else this._isStateInput = false;
        if (this.city) this._isCityInput = true;
        else this._isCityInput = false;
        if (this.postal_code) this._isPostalCodeInput = true;
        else this._isPostalCodeInput = false;
        if (this.ethaddress) this._isETHAddrInput = true;
        else this._isETHAddrInput = false;
    }


    /**
     * Activate/Deactivate user
     */

    activeUser() {
        this._httpUserService.activeUser(this.email).subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
            },
            error => console.log(error)
        )
    }

    deactiveUser() {
        this._httpUserService.deactiveUser(this.email).subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
            },
            error => console.log(error)
        )
    }


    /**
     * Handle CSS
     */

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

}