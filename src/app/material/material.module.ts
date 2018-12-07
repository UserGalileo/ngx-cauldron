import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatSelectModule,
} from '@angular/material';

const MaterialModules = [
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatSelectModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...MaterialModules
  ],
  exports: [
    ...MaterialModules
  ]
})
export class MaterialModule { }
