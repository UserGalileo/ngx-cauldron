import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from 'ngrx-data';
import { Post } from '../models/post.model';

@Injectable()
export class PostService extends EntityCollectionServiceBase<Post> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Post', serviceElementsFactory);
  }
}
