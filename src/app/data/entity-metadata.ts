import { EntityMetadataMap } from 'ngrx-data';

const entityMetadata: EntityMetadataMap = {
  Post: {}
};

// Optional, list only the ones which shouldn't end with just an 's'
const pluralNames = { Post: 'Posts' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};
