import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AUTH_CONFIG, AuthConfig, initialConfig } from './auth.config';
import { AuthStorageService } from './auth-storage.service';

export abstract class AuthService {
  abstract isAuthenticated$: BehaviorSubject<boolean>;
  abstract login(username: string, password: string, rememberMe?: boolean): Observable<any>;
  abstract register(username: string, password: string): Observable<any>;
  abstract refreshToken(token: string): Observable<any>;
  abstract logout(): void;
}

@Injectable()
export class DefaultAuthService implements AuthService {

  private rememberMe = false;
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private authStorage: AuthStorageService,
    @Inject(AUTH_CONFIG) private config: AuthConfig
  ) {
    this.config = {
      ...initialConfig,
      ...config
    };
    this.isAuthenticated$.next(!!this.authStorage.getAccessToken());
  }

  login(username: string, password: string, rememberMe?: boolean) {
    return this.http.get<{ accessToken: string, refreshToken: string }>(this.config.baseUrl + this.config.endpoints.login).pipe(
      tap(({ accessToken, refreshToken }) => {
        this.rememberMe = rememberMe;
        this.authStorage.saveAccessToken(accessToken, rememberMe);
        this.authStorage.saveRefreshToken(refreshToken, rememberMe);
        this.isAuthenticated$.next(true);
      })
    );
  }

  register(username: string, password: string, first_name?: string, last_name?: string) {
    return this.http.post(this.config.baseUrl + this.config.endpoints.register, {
      username,
      password,
      first_name,
      last_name
    });
  }

  refreshToken(token: string) {
    return this.http.post<{ accessToken: string }>(this.config.baseUrl + this.config.endpoints.token, { token }).pipe(
      tap(({ accessToken }) => {
        this.authStorage.saveAccessToken(accessToken, this.rememberMe);
      })
    );
  }

  logout() {
    this.authStorage.removeAccessToken();
    this.authStorage.removeRefreshToken();
    this.isAuthenticated$.next(false);
  }
}
