import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddAdminComponent } from './addadmin.component';
import { HttpAdminService } from './../../services/admin/admin.service';

import { SidebarModule } from './../sidebar/sidebar.module';
import { HeaderModule } from './../header/header.module';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, SidebarModule,
        HeaderModule
    ],
    declarations: [AddAdminComponent],
    providers: [HttpAdminService],
    exports: [AddAdminComponent]
})
export class AddAdminModule { }