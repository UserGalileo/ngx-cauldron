import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { I18nTestComponent } from './i18n-test.component';

const routes: Routes = [
  {
    path: '',
    component: I18nTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class I18nTestRoutingModule { }
