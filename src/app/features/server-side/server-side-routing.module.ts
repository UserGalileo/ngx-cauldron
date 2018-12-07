import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerSideComponent } from './server-side.component';

const routes: Routes = [
  {
    path: '',
    component: ServerSideComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerSideRoutingModule { }
