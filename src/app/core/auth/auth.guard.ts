import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService) {}

  canActivate() {
    return this.auth.isAuthenticated$;
  }

  canActivateChild() {
    return this.auth.isAuthenticated$;
  }
}
