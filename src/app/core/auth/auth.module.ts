import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, DefaultAuthService } from './auth.service';
import { AUTH_CONFIG, AuthConfig, initialConfig } from './auth.config';
import { AuthStorageService } from './auth-storage.service';
import { AuthGuard } from './auth.guard';

/**
 * TODO: test the whole module
 */
@NgModule({
  imports: [ CommonModule ]
})
export class AuthModule {
  static forRoot(config: AuthConfig = initialConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIG,
          useValue: config
        },
        AuthStorageService,
        {
          provide: AuthService,
          useClass: DefaultAuthService
        },
        AuthGuard
      ]
    };
  }
}
