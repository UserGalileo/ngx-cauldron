import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from '../../core/socket/socket.service';
import { environment as env } from '../../../environments/environment';

@Injectable()
export class PostSocketService {

  /**
   * You can use these observables in your ngrx effects,
   * or you could call the public methods, too
   */
  postAdded$: Observable<any>;
  postUpdated$: Observable<any>;
  postDeleted$: Observable<any>;

  constructor(private socket: SocketService) {
    this.socket.join('post');
    this.postAdded$ = this.socket.listen('[Post] Added');
    this.postUpdated$ = this.socket.listen('[Post] Updated');
    this.postDeleted$ = this.socket.listen('[Post] Deleted');
    if (!env.production) {
      console.log('Watch out, PostSocketService is listening!');
    }
  }

  addPost(post) {
    this.socket.emit('[Post] Add', post);
  }

  updatePost(post) {
    this.socket.emit('[Post] Update', post);
  }

  deletePost(postId) {
    this.socket.emit('[Post] Delete', postId);
  }

}
