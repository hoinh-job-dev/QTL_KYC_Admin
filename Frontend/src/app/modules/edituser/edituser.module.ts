import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EditUserComponent } from './edituser.component';
import { HttpUserService } from './../../services/user/user.service';

import { SidebarModule } from './../sidebar/sidebar.module';
import { HeaderModule } from './../header/header.module';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, SidebarModule,
        HeaderModule
    ],
    declarations: [EditUserComponent],
    providers: [HttpUserService],
    exports: [EditUserComponent]
})
export class EditUserModule { }