import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HttpLoginService } from './../../services/login/login.service';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule
    ],
    declarations: [HomeComponent],
    providers: [HttpLoginService],
    exports: [HomeComponent]
})
export class HomeModule { }