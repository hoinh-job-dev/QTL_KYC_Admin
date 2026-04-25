import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar.component';

import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule
    ],
    declarations: [SidebarComponent],
    providers: [],
    exports: [SidebarComponent]
})
export class SidebarModule { }