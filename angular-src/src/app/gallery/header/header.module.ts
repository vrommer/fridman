import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FixedHeaderComponent } from './fixed-header/fixed-header.component';
import { NavComponent } from './nav/nav.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { GalleryRoutingModule } from "../gallery-routing.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule,
    FontAwesomeModule
  ],
  declarations: [
    HeaderComponent,
    FixedHeaderComponent,
    NavComponent,
    MainHeaderComponent
  ],
  exports: [HeaderComponent],
  entryComponents: [HeaderComponent]
})
export class HeaderModule { }
