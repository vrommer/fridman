import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseUpComponent } from './close-up.component';

// User defined modules
import { SharedModule } from '../shared/shared.module';
import { FitImageDirective } from './fit-image.directive';
import {ArtsItemModule} from "../arts-item/arts-item.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ArtsItemModule
  ],
  declarations: [CloseUpComponent, FitImageDirective],
  exports: [CloseUpComponent]
})
export class CloseUpModule {

}
