import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtsGridModule } from './arts-grid/arts-grid.module';
import { CloseUpModule } from './close-up/close-up.module';
import { HeaderModule } from './header/header.module';
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ArtsGridModule,
    CloseUpModule,
    HeaderModule,
    GalleryRoutingModule
  ],
  declarations: [
    GalleryComponent
  ],
  exports: [GalleryComponent]
})
export class GalleryModule { }
