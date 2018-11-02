import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtsGridComponent } from './arts-grid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ArtsGridComponent],
  exports: [ArtsGridComponent]
})
export class ArtsGridModule { }
