import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpUserService } from './../../services/user/user.service';

import global = require('./../../global');

declare let $: any;


@Component({
    selector: 'edituser',
    templateUrl: 'edituser.component.html',
    styleUrls: [],
})

export class EditUserComponent {

    title: string;
    user: any;
    email: any;

    level3_passport: string;
    level3_proof_of_address: string;
    level3_you_with_passport: string;

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _httpUserService: HttpUserService) {
        this.title = "Edit User";
    }

    ngOnInit() {
        this.email = this._activatedRoute.snapshot.params['email'];
        this.getUserInfo(this.email);
    }


    getUserInfo(email: any) {
        this._httpUserService.getUserInfo(email).subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                this.user = data.data;
                this.getImage(this.user);
            },
            error => console.log(error)
        )
    }

    modifyUser() {
        if (!this.user.date_of_birth ||
            !this.user.firstname ||
            !this.user.lastname ||
            !this.user.street1 ||
            !this.user.state ||
            !this.user.city ||
            !this.user.postal_code ||
            !this.user.country) return;
        var datajson = {
            date_of_birth: this.user.date_of_birth,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            street1: this.user.street1,
            street2: this.user.street2,
            state: this.user.state,
            city: this.user.city,
            postal_code: this.user.postal_code,
            country: this.user.country
        }
        this._httpUserService.modifyUser(this.email, datajson).subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                if (this.user.blackuser) {
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

    cancel() {
        this._router.navigate(['/userlist']);
    }

    toogleBlackUser() {
        this.user.blackuser = !this.user.blackuser;
    }

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

    getImage(user: any) {
        if (user.level3_passport) this.level3_passport = this._httpUserService.getImage(user.level3_passport);
        if (user.level3_proof_of_address) this.level3_proof_of_address = this._httpUserService.getImage(user.level3_proof_of_address);
        if (user.level3_you_with_passport) this.level3_you_with_passport = this._httpUserService.getImage(user.level3_you_with_passport);
        this.cssHandle();
    }

    cssHandle() {
        $("#level3_passport").mouseenter(function () {
            $(this).css("opacity", 0.7)
        }).mouseleave(function () {
            $(this).css("opacity", 1)
        });
        $("#level3_proof_of_address").mouseenter(function () {
            $(this).css("opacity", 0.7)
        }).mouseleave(function () {
            $(this).css("opacity", 1)
        });
        $("#level3_you_with_passport").mouseenter(function () {
            $(this).css("opacity", 0.7)
        }).mouseleave(function () {
            $(this).css("opacity", 1)
        });
    }

}