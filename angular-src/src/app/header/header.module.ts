import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';
import { FixedHeaderComponent } from './fixed-header/fixed-header.component';
import { NavComponent } from './nav/nav.component';
import { MainHeaderComponent } from './main-header/main-header.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderRoutingModule
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
