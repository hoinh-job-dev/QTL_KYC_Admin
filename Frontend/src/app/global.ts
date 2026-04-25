'use strict';

import { Response } from '@angular/http';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';
import { config } from './global.config';


// --------------------------------------------
// Handle for post request
// --------------------------------------------
var headers = new Headers({ 'Content-Type': 'application/json' });
export var requestOptions = function (type: any) {
    if (type == "get") return new RequestOptions({ headers: headers, method: "get" });
    return new RequestOptions({ headers: headers, method: "post" });
}

export var handleError = function (error: Response) {
    return Observable.throw(error.json().error || ' error');
}

var headers_authorization = new Headers({ 'Content-Type': 'application/json' });
headers_authorization.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
export var requestAuthorizationOptions = function (type: any) {
    if (type == "get") return new RequestOptions({ headers: headers_authorization, method: "get" });
    return new RequestOptions({ headers: headers_authorization, method: "post" });
}

export var set_headers_authorization = function () {
    headers_authorization.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
}

export var handleAuthorizationError = function (error: Response) {
    return Observable.throw(error || ' error');
}

// --------------------------------------------
// Check login
// --------------------------------------------
export var isValidToken = function (type: string) {
    if (tokenNotExpired(type)) { return true; }
    return false;
};

// --------------------------------------------
// Admin server
// --------------------------------------------
export var adminUrl = config.adminUrl;
export var logInUrl = adminUrl + '/login';
export var logOutUrl = adminUrl + '/logout';
export var changePasswordUrl = adminUrl + '/admin/changepassword';
export var addAdminUrl = adminUrl + '/admin/addadmin';
export var getAllHistoryUrl = adminUrl + '/admin/allhistory';
export var getMyHistoryUrl = adminUrl + '/admin/myhistory';
export var getAdminListUrl = adminUrl + '/admin/adminlist';
export var deleteAdminUrl = adminUrl + '/admin/deleteadmin';
export var getUserListUrl = adminUrl + '/user/userlist';
export var getUserInfoUrl = adminUrl + '/user/userinfo';
export var verifyUserUrl = adminUrl + '/user/verifyuser';
export var getVerifyListUrl = adminUrl + '/user/verifylist';
export var modifyUserUrl = adminUrl + '/user/modifyuser/KYC';
export var activeUserUrl = adminUrl + '/user/activeuser';
export var deactiveUserUrl = adminUrl + '/user/deactiveuser';
export var addUserUrl = adminUrl + '/user/adduser';
export var getRequestHistoryUrl = adminUrl + '/lottery/history';
export var getWinningHistoryUrl = adminUrl + '/lottery/prizes';
export var payPrizesUrl = adminUrl + '/lottery/payprizes';

export var resourceUrl = config.resourceUrl;
export var getImageUrl = resourceUrl + '/admin/getimage';

// --------------------------------------------
// Check length of a string
// --------------------------------------------
export var isInRange = function (s: any, min?: any, max?: any) {
    if (typeof s !== 'string') return false;
    if (min && s.length < min) return false;
    if (max && s.length > max) return false;
    return true;
}

// --------------------------------------------
// Check validation of displayname
// --------------------------------------------
export var isValidDisplayname = function (s: any) {
    var pattern = /[A-Za-z\.\-\_\d]{5,60}/;
    var notpattern = /[^A-Za-z\.\-\_\d]/;
    if (typeof s !== 'string') return false;
    if (!isInRange(s, 5, 60)) return false;
    if (notpattern.test(s)) return false;
    return pattern.test(s);
}

// --------------------------------------------
// Check validation of email
// --------------------------------------------
export var isValidEmail = function (e: any) {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (typeof e !== 'string') return false;
    return pattern.test(e);
}

// --------------------------------------------
// Check validation of password
// --------------------------------------------
export var isValidPassword = function (p: any) {
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,21}/;
    var notpattern = /[^A-Za-z\d!@#$%^&*?]/;
    if (typeof p !== 'string') return false;
    if (!isInRange(p, 8, 21)) return false;
    if (notpattern.test(p)) return false;
    return pattern.test(p);
}
export var atLeastOneLowerCase = function (s: any) {
    var pattern = /[a-z]/;
    if (typeof s !== 'string') return false;
    return pattern.test(s);
}
export var atLeastOneUpperCase = function (s: any) {
    var pattern = /[A-Z]/;
    if (typeof s !== 'string') return false;
    return pattern.test(s);
}
export var atLeastOneNumber = function (s: any) {
    var pattern = /[\d]/;
    if (typeof s !== 'string') return false;
    return pattern.test(s);
}
export var atLeastOneSpecialCharacter = function (s: any) {
    var pattern = /[!@#$%^&*?]/;
    if (typeof s !== 'string') return false;
    return pattern.test(s);
}

// --------------------------------------------
// Country list
// --------------------------------------------
export var country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas"
    , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands"
    , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica"
    , "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
    , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana"
    , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India"
    , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia"
    , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania"
    , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia"
    , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"
    , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre and Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles"
    , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts and Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan"
    , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia"
    , "Turkey", "Turkmenistan", "Turks and Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)"
    , "Yemen", "Zambia", "Zimbabwe"];

// --------------------------------------------
// Check an element is in the array
// --------------------------------------------
export var isIn = function (e: any, a: any) {
    for (var i = 0; i < a.length; i++) {
        if (e == a[i]) return true;
    }
    return false;
}

// --------------------------------------------
// Check validation of email
// --------------------------------------------
export var stepPagination = [10, 20, 30, 40]

// --------------------------------------------
// Convert date/time
// --------------------------------------------
export var convertDate = function (time: any) {
    var t = new Date(time);
    var date = t.getDate();
    var month = t.getMonth() + 1;
    var year = t.getFullYear();
    return date.toString() + "-" + month.toString() + "-" + year.toString();
}