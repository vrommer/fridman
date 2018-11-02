import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseUpComponent } from './close-up.component';

// User defined modules
import { SharedModule } from '../shared/shared.module';
import { FitImageDirective } from './fit-image.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [CloseUpComponent, FitImageDirective],
  exports: [CloseUpComponent]
})
export class CloseUpModule {

}
