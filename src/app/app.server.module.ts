import { APP_BOOTSTRAP_LISTENER, ApplicationRef, NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { filter, first } from 'rxjs/operators';
import { ServerCookiesModule } from '@ngx-utils/cookies/server';
import { Request } from 'express';

import { AppModule, REQ_KEY } from './app.module';
import { AppComponent } from './app.component';

export function requestFactory(appRef: ApplicationRef, transferState: TransferState, request: Request) {
  return () => appRef.isStable.pipe(
    filter(stable => !!stable),
    first()
  ).subscribe(() => {
    transferState.set<any>(REQ_KEY, {
      hostname: request.hostname,
      originalUrl: request.originalUrl,
      referer: request.get('referer')
    });
  });
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    NoopAnimationsModule,
    ServerCookiesModule.forRoot(),
  ],
  providers: [
    /**
     * We need to provide the REQUEST object to the client for some features to work
     */
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: (requestFactory),
      multi: true,
      deps: [
        ApplicationRef,
        TransferState,
        REQUEST,
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
