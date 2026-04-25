import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsLoggedIn } from './isloggedin';
import { IsNotLoggedIn } from './isnotloggedin';
import { HomeComponent } from './../modules/home/home.component';
import { DashboardComponent } from './../modules/dashboard/dashboard.component';
import { ChangePasswordComponent } from './../modules/changepassword/changepassword.component';
import { AddAdminComponent } from './../modules/addadmin/addadmin.component';
import { AdminHistoryComponent } from './../modules/adminhistory/adminhistory.component';
import { MyHistoryComponent } from './../modules/myhistory/myhistory.component';
import { AdminListComponent } from './../modules/adminlist/adminlist.component';
import { UserListComponent } from './../modules/userlist/userlist.component';
import { AddUserComponent } from './../modules/adduser/adduser.component';
import { VerifyUserComponent } from './../modules/verifyuser/verifyuser.component';
import { VerifyOneUserComponent } from './../modules/verifyoneuser/verifyoneuser.component';
import { EditUserComponent } from './../modules/edituser/edituser.component';
import { LotteryComponent } from './../modules/lottery/lottery.component';
import { LotteryHistoryComponent } from './../modules/lotteryhistory/lotteryhistory.component';


export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent, canActivate: [IsNotLoggedIn] },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedIn] },
	{ path: 'changepassword', component: ChangePasswordComponent, canActivate: [IsLoggedIn] },
	{ path: 'addadmin', component: AddAdminComponent, canActivate: [IsLoggedIn] },
	{ path: 'adminhistory', component: AdminHistoryComponent, canActivate: [IsLoggedIn] },
	{ path: 'myhistory', component: MyHistoryComponent, canActivate: [IsLoggedIn] },
	{ path: 'adminlist', component: AdminListComponent, canActivate: [IsLoggedIn] },
	{ path: 'userlist', component: UserListComponent, canActivate: [IsLoggedIn] },
	{ path: 'adduser', component: AddUserComponent, canActivate: [IsLoggedIn] },
	{ path: 'verifyuser', component: VerifyUserComponent, canActivate: [IsLoggedIn] },
	{ path: 'verifyuser/:email', component: VerifyOneUserComponent, canActivate: [IsLoggedIn] },
	{ path: 'edituser/:email', component: EditUserComponent, canActivate: [IsLoggedIn] },
	{ path: 'lottery/:binding', component: LotteryComponent, canActivate: [IsLoggedIn] },
	{ path: 'lotteryhistory', component: LotteryHistoryComponent, canActivate: [IsLoggedIn] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class APP_ROUTER_PROVIDERS { }