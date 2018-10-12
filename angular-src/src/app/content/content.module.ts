import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';

import { ContentRoutingModule } from './content-routing.module'

@NgModule({
  imports: [
    CommonModule,
    ContentRoutingModule
  ],
  declarations: [HomeComponent, HeaderComponent, BodyComponent],
  exports: [HomeComponent],
})
export class ContentModule { }
