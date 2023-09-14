import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { FindComponent } from '../find/find.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HomeComponent,
        FindComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        FormsModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class HomeModule {}
