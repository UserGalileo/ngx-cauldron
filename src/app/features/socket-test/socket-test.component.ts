import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from 'ngrx-data';
import { Post } from '../../data/models/post.model';

@Component({
  selector: 'cn-socket-test',
  template: `
    <p class="title">This is a test for <strong>SocketIO</strong>, it uses <i>ngrx</i>, too.</p>
    <p>These posts are received randomly by a socket and added to the store with a custom effect.</p>
    <mat-list>
      <h3 mat-subheader>Posts</h3>
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
  postService: EntityCollectionService<Post>;

  constructor(private entityServices: EntityServices) {
    this.postService = entityServices.getEntityCollectionService('Post');
    this.posts$ = this.postService.entities$;
  }
}
