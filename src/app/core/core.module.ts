import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreStoreModule } from './store';

import { environment as env } from '../../environments/environment';
import { SocketModule } from './socket/socket.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { I18nModule } from './i18n/i18n.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CoreStoreModule,
    SocketModule.forRoot(env.socket),
    InterceptorsModule,
    I18nModule,
    AuthModule.forRoot()
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() self: CoreModule) {
    if (self) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
