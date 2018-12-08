import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'crud-test',
        loadChildren: './features/crud-test/crud-test.module#CrudTestModule'
      },
      {
        path: 'socket-test',
        loadChildren: './features/socket-test/socket-test.module#SocketTestModule'
      },
      {
        path: 'i18n-test',
        loadChildren: './features/i18n-test/i18n-test.module#I18nTestModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
