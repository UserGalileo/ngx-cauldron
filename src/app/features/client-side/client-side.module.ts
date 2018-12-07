import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSideRoutingModule } from './client-side-routing.module';
import { ClientSideComponent } from './client-side.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ClientSideComponent
  ],
  imports: [
    CommonModule,
    ClientSideRoutingModule,
    SharedModule
  ]
})
export class ClientSideModule { }
