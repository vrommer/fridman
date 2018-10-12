import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  { path: '', redirectTo: 'drawings', pathMatch: 'full' },
  { path: ':param', component: BodyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
