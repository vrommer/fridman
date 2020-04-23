import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtsGridComponent } from './arts-grid.component';
import {ArtsItemModule} from '../arts-item/arts-item.module';
import { DrawingsComponent } from './drawings.component';
import { CalligraphyComponent } from './calligraphy.component';
import { SculpturesComponent } from './sculptures.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    ArtsItemModule,
    MatProgressSpinnerModule
  ],
  declarations: [ArtsGridComponent, DrawingsComponent, CalligraphyComponent, SculpturesComponent],
  exports: [ArtsGridComponent]
})
export class ArtsGridModule { }
