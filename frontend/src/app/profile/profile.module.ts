import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './components/test/user.component'
import { FollowersComponent } from '../followers/followers.component';
import { FeedComponent } from '../feed/feed.component';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
  declarations: [
    //Declaração dos componentes
    UserComponent,
    FollowersComponent,
    FeedComponent,
    EditComponent
  ],
  imports: [
    //Necessário importar o módulo de rotas do profile
    CommonModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule { }
