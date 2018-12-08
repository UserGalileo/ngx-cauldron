import { Injector, NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptor } from './universal.interceptor';
import { NgrxDataInterceptor } from './ngrx-data.interceptor';

@NgModule({
  imports: [ CommonModule ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      deps: [
        Injector,
        PLATFORM_ID
      ],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgrxDataInterceptor,
      multi: true
    }
  ]
})
export class InterceptorsModule { }
