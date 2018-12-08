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
    this.postAdded$ = this.socket.listen('[User] Added');
    this.postUpdated$ = this.socket.listen('[User] Updated');
    this.postDeleted$ = this.socket.listen('[User] Deleted');
    if (!env.production) {
      console.log('Watch out, PostSocketService is listening!');
    }
  }

  addPost(post) {
    this.socket.emit('[User] Add', post);
  }

  updatePost(post) {
    this.socket.emit('[User] Update', post);
  }

  deletePost(postId) {
    this.socket.emit('[User] Delete', postId);
  }

}
