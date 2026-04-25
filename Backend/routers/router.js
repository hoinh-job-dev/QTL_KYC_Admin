var express = require('express');
var router = express.Router();

var auth = require('./../controllers/auths.controller');
var privilege = require('./../controllers/privileges.controller');
var admin = require('./../controllers/admin.controller');
var user = require('./../controllers/user.controller');
var smartcontract = require('./../controllers/smartcontract.controller');
var protect = require('./../controllers/protect.controller');
var lottery = require('./../controllers/lottery.controller');


/**
 * GET API
 */

router.get('/admin/allhistory', auth.isLoggedIn, admin.getAllHistory);
router.get('/admin/myhistory', auth.isLoggedIn, admin.getMyHistory);
router.get('/admin/adminlist', auth.isLoggedIn, admin.getAdminList);
router.get('/user/userlist', auth.isLoggedIn, user.getUserList);
router.get('/user/verifylist', auth.isLoggedIn, user.getVerifyList);
router.get('/lottery/history', auth.isLoggedIn, lottery.getHistory);
router.get('/lottery/prizes', auth.isLoggedIn, lottery.getPrizes);
router.get('/logout', auth.isLoggedIn, auth.logout);


/**
 * POST API
 */

router.post('/login', auth.adminAuthenticated, auth.saveToken);
router.post('/admin/changepassword', auth.isLoggedIn, admin.changePassword);
router.post('/admin/addadmin', auth.isLoggedIn, privilege.isMasterAdmin, admin.addAdmin);
router.post('/admin/deleteadmin', auth.isLoggedIn, privilege.isMasterAdmin, admin.deleteAdmin);
router.post('/user/adduser', auth.isLoggedIn, privilege.isMasterOrSystemAdmin, protect.isLegalETHAddr, user.signup, user.saveKYC, user.saveNonKYC, smartcontract.registerKYC);
router.post('/user/verifyuser', auth.isLoggedIn, user.verifyUser, smartcontract.changeKYC);
router.post('/user/modifyuser/KYC', auth.isLoggedIn, privilege.isMasterOrSystemAdmin, user.modifyKYC);
router.post('/user/deactiveuser', auth.isLoggedIn, privilege.isMasterOrSystemAdmin, user.deactiveUser);
router.post('/user/activeuser', auth.isLoggedIn, privilege.isMasterOrSystemAdmin, user.activeUser);
router.post('/user/userinfo', auth.isLoggedIn, user.getUserInfo);
router.post('/lottery/payprizes', auth.isLoggedIn, lottery.logHistory, lottery.payPrizes, smartcontract.pay);


module.exports = router;