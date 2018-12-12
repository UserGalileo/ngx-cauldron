/**
 * For Angular Universal:
 * requests which start with a dot (ex. ./assets/...)
 * or relative ones ( ex. /assets/...) will be converted
 * to absolute path
 */
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { Request } from 'express';
import { Observable } from 'rxjs';

const getBaseUrl = (req: any) => `${req.protocol}://${req.get('Host')}`;

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  constructor(
    private readonly injector: Injector,
    @Inject(PLATFORM_ID) private readonly platformId: any) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isServer = isPlatformServer(this.platformId);

    if (isServer && !request.url.includes('http') && (request.url.includes('./') || request.url[0] === '/')) {
      const serverRequest = this.injector.get(REQUEST) as Request;
      const baseUrl = getBaseUrl(serverRequest);
      let endpoint = request.url.replace('./', '');
      /**
       * ISSUE https://github.com/angular/angular/issues/19224
       * HttpClient doesn't support relative requests server-side
       */
      if (endpoint[0] === '/') {
        endpoint = endpoint.substring(1);
      }
      request = request.clone({
        url: `${baseUrl}/${endpoint}`
      });
    }
    return next.handle(request);
  }
}
