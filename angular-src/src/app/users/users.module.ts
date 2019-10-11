import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UsersComponent, SignInFormComponent, LogInFormComponent],
  exports: [UsersComponent],
})
export class UsersModule { }
