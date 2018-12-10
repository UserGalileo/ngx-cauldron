import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { EntityCollectionService, EntityServices } from 'ngrx-data';
import { Post } from '../models/post.model';
import { PostSocketService } from '../socket';

@Injectable()
export class PostEffects {

  private postService: EntityCollectionService<Post>;

  constructor(
    private entityServices: EntityServices,
    private postSocket: PostSocketService
  ) {
    this.postService = entityServices.getEntityCollectionService('Post');
  }

  @Effect({ dispatch: false })
  postAdded$ = this.postSocket.postAdded$.pipe(
    tap(post => {
      // We want to have different ids to have more posts with the same entities (testing)
      post = {
        ...post,
        id: Math.floor(Math.random() * 1000)
      };
      this.postService.addOneToCache(post);
    }),
  );
}
