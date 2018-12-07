import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketTestRoutingModule } from './socket-test-routing.module';
import { SocketTestComponent } from './socket-test.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    SocketTestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SocketTestRoutingModule
  ]
})
export class SocketTestModule { }
