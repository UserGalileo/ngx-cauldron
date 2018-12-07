import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices } from 'ngrx-data';
import { Post } from '../../data/models/post.model';

@Component({
  selector: 'cn-server-side',
  template: `
    <p class="title">This route was generated <strong>server-side</strong> with <i>Angular Universal</i>.</p>
    <p>{{ 'SERVER_SIDE.DESCRIPTION' | translate }}</p>

    <mat-list *ngIf="posts$ | async as posts">
      <h3 mat-subheader>Posts</h3>
      <mat-progress-bar *ngIf="!posts.length" mode="indeterminate"></mat-progress-bar>
      <mat-list-item *ngFor="let post of posts">
        <mat-icon mat-list-icon>create</mat-icon>
        <h4 mat-line>{{ post.title }}</h4>
        <p mat-line>Id: {{ post.id }} </p>
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    .title {
      font-size: 1.5rem;
    }
  `]
})
export class ServerSideComponent implements OnInit {
  posts$: Observable<Post[]>;
  postService: EntityCollectionService<Post>;

  constructor(entityServices: EntityServices) {
    this.postService = entityServices.getEntityCollectionService('Post');
    this.posts$ = this.postService.entities$;
  }

  ngOnInit() {
    this.postService.getAll();
  }
}
