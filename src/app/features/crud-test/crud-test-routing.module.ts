import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudTestComponent } from './crud-test.component';

const routes: Routes = [
  {
    path: '',
    component: CrudTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudTestRoutingModule { }
