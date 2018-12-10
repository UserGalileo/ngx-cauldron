import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultDataServiceConfig, HttpUrlGenerator, NgrxDataModule } from 'ngrx-data';
import { PluralHttpUrlGenerator } from './plural-http-url-generator';
import { entityConfig } from './entity-metadata';
import { socketServices } from './socket';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './effects';

const dataServiceConfig: DefaultDataServiceConfig = {
  root: environment.endpoint
};

@NgModule({
  imports: [
    CommonModule,
    NgrxDataModule.forRoot(entityConfig),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: dataServiceConfig },
    { provide: HttpUrlGenerator, useClass: PluralHttpUrlGenerator },
    ...socketServices
  ]
})
export class DataModule {}
