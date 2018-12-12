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
    <div style="height: 20px"></div>
    <mat-card *ngFor="let post of posts$ | async">
      <mat-card-title>{{ post.title }}</mat-card-title>
      <mat-card-content>{{ post.body }}</mat-card-content>
    </mat-card>
  `,
  styles: [`
    .title {
      font-size: 1.5rem;
    }
    mat-card {
      width: 200px;
      display: inline-block;
      margin: 10px;
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
