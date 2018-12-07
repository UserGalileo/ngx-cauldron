import { NgModule } from '@angular/core';
import { BrowserModule, makeStateKey } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { MaterialModule } from './material/material.module';
import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';
import { SharedModule } from './shared/shared.module';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

const AppModules = [
  AppRoutingModule,
  SharedModule,
  MaterialModule,
  CoreModule,
  DataModule
];

/**
 * Used by Universal to transport the Request object from Express
 */
export const REQ_KEY = makeStateKey<string>('req');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    ...AppModules
  ],
  providers: [
    /**
     * We need these for @ngx-utils/cookies and other
     * libraries which are not up-to-date with universal
     */
    {
      provide: 'REQUEST',
      useExisting: REQUEST
    },
    {
      provide: 'RESPONSE',
      useExisting: RESPONSE
    }
  ],
  exports: [
    AppComponent,
    HomeComponent,
    ...AppModules
  ]
})
export class AppModule { }
