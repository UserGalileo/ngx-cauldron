import { Component } from '@angular/core';

@Component({
  selector: 'cn-home',
  template: `
    <h3>Welcome to the Cauldron!</h3>
    <p>This project was created to test and demonstrate different libraries and approaches making sure they all go well together.</p>

    <mat-list>
      <h3 mat-subheader>Features</h3>
      <mat-list-item *ngFor="let feature of features">
        <mat-icon mat-list-icon>{{ feature.done ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>
        <h4 mat-line>{{ feature.name }}</h4>
        <p mat-line>{{ feature.description }} </p>
      </mat-list-item>
    </mat-list>
  `
})
export class HomeComponent {
  features = [
    {
      name: 'Angular Material',
      done: true
    },
    {
      name: 'Angular Universal',
      description: 'w/ TransferHttpCacheModule, only for some routes!',
      done: true
    },
    {
      name: 'I18n',
      description: 'w/ ngx-translate and Persistance (even on Universal w/ cookies)',
      done: true
    },
    {
      name: 'NGRX',
      description: 'w/ effects, ngrx-data',
      done: true
    },
    {
      name: 'Socket IO',
      done: true
    },
    {
      name: 'PWA',
      description: 'w/ Push Notifications',
      done: false
    },
    {
      name: 'Stateless Authentication w/ JWT',
      description: 'via localStorage (in Universal: protected routes aren\'t rendered server-side since they\'re not useful for SEO)',
      done: false
    },
    {
      name: 'Router Animations',
      done: true
    },
  ];
}
