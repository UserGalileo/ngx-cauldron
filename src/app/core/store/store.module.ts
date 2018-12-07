import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment as env } from '../../../environments/environment';
import { reducers, metaReducers } from './reducers';
import { CustomSerializer } from './reducers/router.reducer';
import { effects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    env.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
})
export class CoreStoreModule {}
