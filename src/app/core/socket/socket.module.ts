import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopSocketService, SocketService } from './socket.service';
import { SOCKET_CONFIG, SocketConfig } from './config';

export function socketFactory(config: SocketConfig) {
  return config && config.baseUrl ? new SocketService(config) : new NoopSocketService();
}

@NgModule({
  imports: [ CommonModule ]
})
export class SocketModule {
  static forRoot(config: SocketConfig): ModuleWithProviders {
    return {
      ngModule: SocketModule,
      providers: [
        {
          provide: SOCKET_CONFIG,
          useValue: config
        },
        {
          provide: SocketService,
          useFactory: (socketFactory),
          deps: [SOCKET_CONFIG]
        }
      ]
    };
  }
}
