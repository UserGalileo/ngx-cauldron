import { UserService } from './user.service';
import { PostService } from './post.service';
import { CommentService } from './comment.service';

export const services: any[] = [
  UserService,
  PostService,
  CommentService
];

export * from './user.service';
export * from './post.service';
export * from './comment.service';
