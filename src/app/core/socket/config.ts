import { InjectionToken } from '@angular/core';

export interface SocketConfig {
  baseUrl: string;
  config?: Object;
}

export const SOCKET_CONFIG = new InjectionToken<SocketConfig>('SocketIO configuration');
