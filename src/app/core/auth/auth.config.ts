import { InjectionToken } from '@angular/core';

export interface AuthConfig {
  baseUrl?: string;
  storage: 'localStorage' | 'cookie';
  endpoints?: {
    login?: string,
    register?: string,
    token?: string
  };
}

export const initialConfig: AuthConfig = {
  baseUrl: '',
  storage: 'localStorage',
  endpoints: {
    login: '/login',
    register: '/signup',
    token: '/token'
  }
};

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('Auth config');
