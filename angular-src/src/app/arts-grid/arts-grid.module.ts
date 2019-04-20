import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtsGridComponent } from './arts-grid.component';
import {ArtsItemModule} from "../arts-item/arts-item.module";

@NgModule({
  imports: [
    CommonModule,
    ArtsItemModule
  ],
  declarations: [ArtsGridComponent],
  exports: [ArtsGridComponent]
})
export class ArtsGridModule { }
