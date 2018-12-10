import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../../environments/environment';
import { DefaultDataServiceConfig, HttpUrlGenerator, NgrxDataModule } from 'ngrx-data';
import { PluralHttpUrlGenerator } from './plural-http-url-generator';
import { entityConfig } from './entity-metadata';
import { socketServices } from './socket';
import { effects } from './effects';
import { services } from './services';

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
    ...socketServices,
    ...services
  ]
})
export class DataModule {}
