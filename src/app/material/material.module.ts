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
  MatDialogModule,
  MatInputModule
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
  MatDialogModule,
  MatInputModule
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
