import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerSideRoutingModule } from './server-side-routing.module';
import { ServerSideComponent } from './server-side.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ServerSideComponent
  ],
  imports: [
    CommonModule,
    ServerSideRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ServerSideModule { }
