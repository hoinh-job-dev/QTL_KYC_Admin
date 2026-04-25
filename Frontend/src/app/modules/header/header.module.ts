import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { HttpLoginService } from './../../services/login/login.service';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule
    ],
    declarations: [HeaderComponent],
    providers: [HttpLoginService],
    exports: [HeaderComponent]
})
export class HeaderModule { }