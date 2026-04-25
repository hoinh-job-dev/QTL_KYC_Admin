import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpUserService } from './../../services/user/user.service';

import global = require('./../../global');

declare let $: any;


@Component({
    selector: 'verifyoneuser',
    templateUrl: 'verifyoneuser.component.html',
    styleUrls: [],
})

export class VerifyOneUserComponent {

    title: string;
    user: any;
    email: any;

    level3_passport: string;
    level3_proof_of_address: string;
    level3_you_with_passport: string;

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _httpUserService: HttpUserService) {
        this.title = "Verify User";
    }

    ngOnInit() {
        this.email = this._activatedRoute.snapshot.params['email'];
        this.getUserInfo(this.email);
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

    verifyUser(email: string, verified: boolean) {
        this._httpUserService.verifyUser(email, verified).subscribe(
            data => {
                if (data.state != 'success') return console.log(data.error);
                var r = confirm("txID: " + data.data);
                if (r == true) {
                    this._router.navigate(['/userlist']);
                }
            },
            error => console.log(error)
        )
    }

    cancel() {
        this._router.navigate(['/userlist']);
    }

    getImage(user: any) {
        if (user.level3_passport) this.level3_passport = this._httpUserService.getImage(user.level3_passport);
        if (user.level3_proof_of_address) this.level3_proof_of_address = this._httpUserService.getImage(user.level3_proof_of_address);
        if (user.level3_you_with_passport) this.level3_you_with_passport = this._httpUserService.getImage(user.level3_you_with_passport);
        this.cssHandle();
    }
}