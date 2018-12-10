import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from 'ngrx-data';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentService extends EntityCollectionServiceBase<Comment> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Comment', serviceElementsFactory);
  }
}
