import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MyHistoryComponent } from './myhistory.component';
import { HttpAdminService } from './../../services/admin/admin.service';

import { SidebarModule } from './../sidebar/sidebar.module';
import { HeaderModule } from './../header/header.module';
import { PaginationModule } from './../pagination/pagination.module';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, SidebarModule,
        HeaderModule, PaginationModule
    ],
    declarations: [MyHistoryComponent],
    providers: [HttpAdminService],
    exports: [MyHistoryComponent]
})
export class MyHistoryModule { }