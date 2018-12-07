import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultDataServiceConfig, NgrxDataModule } from 'ngrx-data';
import { entityConfig } from './entity-metadata';
import { socketServices } from './socket';

const dataServiceConfig: DefaultDataServiceConfig = {
  root: 'https://jsonplaceholder.typicode.com', // default root path to the server's web api
};

@NgModule({
  imports: [
    CommonModule,
    NgrxDataModule.forRoot(entityConfig)
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: dataServiceConfig },
    ...socketServices
  ]
})
export class DataModule { }
