import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtsGridComponent } from './arts-grid.component';
import {ArtsItemModule} from "../arts-item/arts-item.module";
import { DrawingsComponent } from './drawings.component';
import { CalligraphyComponent } from './calligraphy.component';
import { SculpturesComponent } from './sculptures.component';

@NgModule({
  imports: [
    CommonModule,
    ArtsItemModule
  ],
  declarations: [ArtsGridComponent, DrawingsComponent, CalligraphyComponent, SculpturesComponent],
  exports: [ArtsGridComponent]
})
export class ArtsGridModule { }
