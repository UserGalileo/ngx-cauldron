import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { AppModule, REQ_KEY } from './app.module';
import { AppComponent } from './app.component';
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';

@NgModule({
  imports: [
    AppModule,
    BrowserAnimationsModule,
    BrowserCookiesModule.forRoot(),
  ],
  providers: [
    /**
     * We need to get the REQUEST object from the Express Server (ex. w/ ngx-translate)
     */
    {
      provide: REQUEST,
      useFactory: (transferState: TransferState) => transferState.get<any>(REQ_KEY, {}),
      deps: [TransferState]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
