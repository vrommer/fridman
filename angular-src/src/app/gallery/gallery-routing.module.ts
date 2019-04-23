import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ArtsGridComponent } from './arts-grid/arts-grid.component';
import { GalleryComponent } from "./gallery.component";

const routes: Routes = [
  { path: 'gallery', component: GalleryComponent, children: [
    { path: ':param', component: ArtsGridComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GalleryRoutingModule { }
