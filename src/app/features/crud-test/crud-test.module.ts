import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudTestRoutingModule } from './crud-test-routing.module';
import { CrudTestComponent } from './crud-test.component';
import { CrudUserComponent } from './crud-user.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CrudTestComponent,
    CrudUserComponent
  ],
  imports: [
    CommonModule,
    CrudTestRoutingModule,
    SharedModule,
    MaterialModule
  ],
  entryComponents: [
    CrudUserComponent
  ]
})
export class CrudTestModule { }
