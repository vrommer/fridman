import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ArtsGridComponent } from '../arts-grid/arts-grid.component';

const routes: Routes = [
  { path: ':param', component: ArtsGridComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HeaderRoutingModule { }
