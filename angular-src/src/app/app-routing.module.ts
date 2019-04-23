import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  { path: '', redirectTo: '/gallery/drawings', pathMatch: 'full' },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
