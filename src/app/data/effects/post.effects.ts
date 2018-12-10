import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { PostSocketService } from '../socket';
import { PostService } from '../services';

@Injectable()
export class PostEffects {

  constructor(
    private postService: PostService,
    private postSocket: PostSocketService
  ) {}

  /**
   * I don't want to use the basic ngrx-data actions myself
   * because they're too low-level, for simplicity I use our services
   */
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
