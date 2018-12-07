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
        path: 'server-side',
        loadChildren: './features/server-side/server-side.module#ServerSideModule'
      },
      {
        path: 'client-side',
        loadChildren: './features/client-side/client-side.module#ClientSideModule'
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
