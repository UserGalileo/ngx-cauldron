import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AUTH_CONFIG, AuthConfig } from './auth.config';

@Injectable()
export class AuthStorageService {

  private accessToken: string;
  private refreshToken: string;

  constructor(
    @Inject(AUTH_CONFIG) private config: AuthConfig,
    @Inject(DOCUMENT) private document: Document
  ) {}

  private saveToken(name: string, token: string, persist = false) {
    if (isPlatformBrowser(PLATFORM_ID) && this.config.storage === 'localStorage') {
      localStorage.setItem(name, token);
    } else if (this.config.storage === 'cookie') {
      this.document.cookie = `${name} = ${token}`;
    }
  }

  private getToken(name: string): string {
    if (isPlatformBrowser(PLATFORM_ID) && this.config.storage === 'localStorage') {
      return localStorage.getItem(name);
    } else if (this.config.storage === 'cookie') {
      const v = this.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
    } else {
      return null;
    }
  }

  private removeToken(name: string) {
    if (isPlatformBrowser(PLATFORM_ID) && this.config.storage === 'localStorage') {
      localStorage.removeItem(name);
    } else if (this.config.storage === 'cookie') {
      this.document.cookie = name + ' =;';
    }
  }

  saveAccessToken(token: string, persist = false) {
    this.saveToken('accessToken', token, persist);
  }

  saveRefreshToken(token: string, persist = false) {
    this.saveToken('refreshToken', token, persist);
  }

  getAccessToken(): string {
    return this.getToken('accessToken') || this.accessToken;
  }

  getRefreshToken(): string {
    return this.getToken('refreshToken') || this.refreshToken;
  }

  removeAccessToken() {
    return this.removeToken('accessToken');
  }

  removeRefreshToken() {
    return this.removeToken('refreshToken');
  }
}
