import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtsItemComponent } from './arts-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ArtsItemComponent],
  exports: [ArtsItemComponent]
})
export class ArtsItemModule { }
