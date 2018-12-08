import { Component, VERSION } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { routerAnimation } from './core/animations/router.animations';

@Component({
  selector: 'cn-root',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport="true"
                   [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
                   [mode]="(isHandset$ | async) ? 'over' : 'side'"
                   [opened]="!(isHandset$ | async)">
        <mat-toolbar>Menu</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a mat-list-item routerLink="/crud-test" routerLinkActive="active">CRUD</a>
          <a mat-list-item routerLink="/socket-test" routerLinkActive="active">SocketIO</a>
          <a mat-list-item routerLink="/i18n-test" routerLinkActive="active">i18n</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            *ngIf="isHandset$ | async">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <span>Angular {{ version }} - Cauldron</span>
        </mat-toolbar>
        <!-- Add Content Here -->
        <div class="main-wrapper" [@routerAnimation]="outlet.isActivated && outlet.activatedRoute">
          <router-outlet #outlet="outlet"></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100%;
    }
    .sidenav {
      width: 200px;
    }
    .sidenav .mat-toolbar {
      background: inherit;
    }
    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .main-wrapper {
      padding: 2rem;
    }
    .active {
      background: rgba(0,0,0,.1);
    }
  `],
  animations: [ routerAnimation ]
})
export class AppComponent {
  // Angular Version
  version = VERSION.full;
  // Responsive Sidenav
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
