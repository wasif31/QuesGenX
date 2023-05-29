import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, SharedModule],
  declarations: [UserPageComponent, UserListComponent]
})
export class UsersModule {}
