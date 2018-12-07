import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientSideComponent } from './client-side.component';

const routes: Routes = [
  {
    path: '',
    component: ClientSideComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSideRoutingModule { }
