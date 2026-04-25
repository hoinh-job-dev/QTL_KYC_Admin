import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { APP_ROUTER_PROVIDERS } from './routers/app.routes';
import { IsLoggedIn } from './routers/isloggedin';
import { IsNotLoggedIn } from './routers/isnotloggedin';

import { HomeModule } from './modules/home/home.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ChangePasswordModule } from './modules/changepassword/changepassword.module';
import { AddAdminModule } from './modules/addadmin/addadmin.module';
import { AdminHistoryModule } from './modules/adminhistory/adminhistory.module';
import { MyHistoryModule } from './modules/myhistory/myhistory.module';
import { AdminListModule } from './modules/adminlist/adminlist.module';
import { UserListModule } from './modules/userlist/userlist.module';
import { AddUserModule } from './modules/adduser/adduser.module';
import { VerifyUserModule } from './modules/verifyuser/verifyuser.module';
import { VerifyOneUserModule } from './modules/verifyoneuser/verifyoneuser.module';
import { EditUserModule } from './modules/edituser/edituser.module';
import { LotteryModule } from './modules/lottery/lottery.module';
import { LotteryHistoryModule } from './modules/lotteryhistory/lotteryhistory.module';


@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule,
    APP_ROUTER_PROVIDERS, HomeModule, DashboardModule, ChangePasswordModule,
    AddAdminModule, AdminHistoryModule, MyHistoryModule, AdminListModule,
    UserListModule, AddUserModule, VerifyUserModule, VerifyOneUserModule,
    EditUserModule, LotteryModule, LotteryHistoryModule
  ],
  declarations: [AppComponent],
  providers: [IsLoggedIn, IsNotLoggedIn, AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})


export class AppModule { }
