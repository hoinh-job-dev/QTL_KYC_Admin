import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminHistoryComponent } from './adminhistory.component';
import { HttpAdminService } from './../../services/admin/admin.service';

import { SidebarModule } from './../sidebar/sidebar.module';
import { HeaderModule } from './../header/header.module';
import { PaginationModule } from './../pagination/pagination.module';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, SidebarModule,
        HeaderModule, PaginationModule
    ],
    declarations: [AdminHistoryComponent],
    providers: [HttpAdminService],
    exports: [AdminHistoryComponent]
})
export class AdminHistoryModule { }