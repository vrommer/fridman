import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderRoutingModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [HeaderComponent],
  entryComponents: [HeaderComponent]
})
export class HeaderModule { }
