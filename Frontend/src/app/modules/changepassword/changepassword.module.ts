import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChangePasswordComponent } from './changepassword.component';
import { HttpAdminService } from './../../services/admin/admin.service';

import { SidebarModule } from './../sidebar/sidebar.module';
import { HeaderModule } from './../header/header.module';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, SidebarModule,
        HeaderModule
    ],
    declarations: [ChangePasswordComponent],
    providers: [HttpAdminService],
    exports: [ChangePasswordComponent]
})
export class ChangePasswordModule { }