import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultDataServiceConfig, NgrxDataModule } from 'ngrx-data';
import { entityConfig } from './entity-metadata';
import { socketServices } from './socket';
import { environment } from '../../environments/environment';

const dataServiceConfig: DefaultDataServiceConfig = {
  root: environment.endpoint
};

@NgModule({
  imports: [
    CommonModule,
    NgrxDataModule.forRoot(entityConfig),
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: dataServiceConfig },
    ...socketServices
  ]
})
export class DataModule {}
