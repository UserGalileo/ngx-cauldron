import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nTestRoutingModule } from './i18n-test-routing.module';
import { I18nTestComponent } from './i18n-test.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    I18nTestComponent
  ],
  imports: [
    CommonModule,
    I18nTestRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class I18nTestModule { }
