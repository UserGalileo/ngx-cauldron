import { Component } from '@angular/core';

@Component({
  selector: 'cn-client-side',
  template: `
    <p class="title">This route was generated client-side. It <strong>never</strong> uses <i>Angular Universal</i>.</p>
    <p>Try to refresh and inspect this page: you won't see any content in the root component.</p>
  `,
  styles: [`
    .title {
      font-size: 1.5rem;
    }
  `]
})
export class ClientSideComponent {}
