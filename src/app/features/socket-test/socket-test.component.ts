import { Component } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { PostSocketService } from '../../data/socket';

@Component({
  selector: 'cn-socket-test',
  template: `
    <p class="title">This is a test for <strong>SocketIO</strong>, it uses <i>ngrx</i>, too.</p>
  `,
  styles: [`
    .title {
      font-size: 1.5rem;
    }
  `]
})
export class SocketTestComponent {

  postEvents$: Observable<any>;

  constructor(public postSocket: PostSocketService) {
    this.postEvents$ = merge(
      this.postSocket.postAdded$,
      this.postSocket.postUpdated$,
      this.postSocket.postDeleted$,
    );
  }
}
