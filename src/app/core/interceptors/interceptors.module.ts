import { Injector, NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptor } from './universal.interceptor';

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
  ]
})
export class InterceptorsModule { }
