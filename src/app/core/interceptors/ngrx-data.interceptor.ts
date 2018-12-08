import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NgrxDataInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const response = next.handle(request);

    if (request.url.includes('api') && request.method === 'GET') {
      return response.pipe(
        map((res: HttpResponse<any>) => {
          if (!res || !res['body'] || !res['body']['data']) { return res; }
          return res.clone({
            body: res.body['data']
          });
        })
      );
    }

    return response;
  }
}
