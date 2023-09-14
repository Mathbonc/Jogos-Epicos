import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { HistoricListComponent } from './historic-list/historic-list.component';
import { FollowersComponent } from './followers/followers.component';
import { ProfileModule } from './profile/profile.module';
import { FeedComponent } from './feed/feed.component';

import { HomeModule } from './home/home.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { GameListComponent } from './game-list/game-list.component';


@NgModule({
    declarations: [AppComponent, HistoricListComponent, NotFoundComponent, SignupComponent],
    imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        SharedModule,
        HomeModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ProfileModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
