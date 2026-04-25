import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LotteryHistoryComponent } from './lotteryhistory.component';
import { HttpLotteryService } from './../../services/lottery/lottery.service';

import { SidebarModule } from './../sidebar/sidebar.module';
import { HeaderModule } from './../header/header.module';
import { PaginationModule } from './../pagination/pagination.module';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, SidebarModule,
        HeaderModule, PaginationModule
    ],
    declarations: [LotteryHistoryComponent],
    providers: [HttpLotteryService],
    exports: [LotteryHistoryComponent]
})
export class LotteryHistoryModule { }