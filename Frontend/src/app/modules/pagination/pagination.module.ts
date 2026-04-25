import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PaginationComponent } from './pagination.component';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule
    ],
    declarations: [PaginationComponent],
    providers: [],
    exports: [PaginationComponent]
})
export class PaginationModule { }