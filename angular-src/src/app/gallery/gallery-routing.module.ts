import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ArtsGridComponent } from './arts-grid/arts-grid.component';
import { GalleryComponent } from "./gallery.component";
import {DrawingsComponent} from "./arts-grid/drawings.component";
import {SculpturesComponent} from "./arts-grid/sculptures.component";
import {CalligraphyComponent} from "./arts-grid/calligraphy.component";

const routes: Routes = [
  { path: 'gallery', component: GalleryComponent, children: [
    { path: 'drawings', component: DrawingsComponent },
    { path: 'sculptures', component: SculpturesComponent },
    { path: 'calligraphy', component: CalligraphyComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GalleryRoutingModule { }
