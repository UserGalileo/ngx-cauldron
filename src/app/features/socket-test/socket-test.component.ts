import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../data/models/post.model';
import { PostService } from '../../data/services';
import { SocketService } from '../../core/socket/socket.service';

@Component({
  selector: 'cn-socket-test',
  template: `
    <p class="title">This is a test for <strong>SocketIO</strong>, it uses <i>ngrx</i>, too.</p>
    <p>These posts are received randomly by a socket and added to the store with a custom effect.</p>
    <button
      mat-raised-button
      [color]="isOn ? 'warn' : 'primary'"
      (click)="onStartStop(isOn)">{{ isOn ? 'Stop all sockets' : 'Start all sockets' }}</button>
    <mat-list>
      <h3 mat-subheader>"Post Added" events</h3>
      <mat-list-item *ngFor="let post of posts$ | async">
        <h4 mat-line>{{ post.title }}</h4>
        <p mat-line>{{ post.body }} </p>
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    .title {
      font-size: 1.5rem;
    }
  `]
})
export class SocketTestComponent {

  posts$: Observable<Post[]>;
  isOn: boolean;

  constructor(
    private postService: PostService,
    private socketService: SocketService
  ) {
    this.posts$ = this.postService.entities$;
    this.socketService.connected$.subscribe(isOn => this.isOn = isOn);
    this.socketService.disconnect();
  }

  onStartStop(isOn) {
    if (isOn) {
      this.socketService.disconnect();
    } else {
      this.socketService.connect();
    }
  }
}
