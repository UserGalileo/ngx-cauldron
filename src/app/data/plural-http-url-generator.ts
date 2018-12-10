import { Injectable } from '@angular/core';
import {
  EntityHttpResourceUrls,
  HttpResourceUrls,
  HttpUrlGenerator,
  normalizeRoot,
  Pluralizer
} from 'ngrx-data';

@Injectable()
export class PluralHttpUrlGenerator implements HttpUrlGenerator {
  /**
   * Known single-entity and collection resource URLs for HTTP calls.
   * Generator methods returns these resource URLs for a given entity type name.
   * If the resources for an entity type name are not know, it generates
   * and caches a resource name for future use
   */
  protected knownHttpResourceUrls: EntityHttpResourceUrls = {};

  constructor(private pluralizer: Pluralizer) {}

  /**
   * Get or generate the entity and collection resource URLs for the given entity type name
   * @param entityName {string} Name of the entity type, e.g, 'Hero'
   * @param root {string} Root path to the resource, e.g., 'some-api`
   */
  protected getResourceUrls(
    entityName: string,
    root: string
  ): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (!resourceUrls) {
      const nRoot = normalizeRoot(root);
      /**
       * URLS are ALWAYS plural by design in our API, let's force it!
       */
      const pluralUrl = `${nRoot}/${this.pluralizer.pluralize(
        entityName
      )}/`.toLowerCase();
      resourceUrls = {
        entityResourceUrl: pluralUrl,
        collectionResourceUrl: pluralUrl
      };
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;
  }

  /**
   * Create the path to a single entity resource
   * @param entityName {string} Name of the entity type, e.g, 'Hero'
   * @param root {string} Root path to the resource, e.g., 'some-api`
   * @returns complete path to resource, e.g, 'some-api/hero'
   */
  entityResource(entityName: string, root: string): string {
    return this.getResourceUrls(entityName, root).entityResourceUrl;
  }

  /**
   * Create the path to a multiple entity (collection) resource
   * @param entityName {string} Name of the entity type, e.g, 'Hero'
   * @param root {string} Root path to the resource, e.g., 'some-api`
   * @returns complete path to resource, e.g, 'some-api/heroes'
   */
  collectionResource(entityName: string, root: string): string {
    return this.getResourceUrls(entityName, root).collectionResourceUrl;
  }

  /**
   * Register known single-entity and collection resource URLs for HTTP calls
   * @param entityHttpResourceUrls {EntityHttpResourceUrls} resource urls for specific entity type names
   * Well-formed resource urls end in a '/';
   * Note: this method does not ensure that resource urls are well-formed.
   */
  registerHttpResourceUrls(
    entityHttpResourceUrls: EntityHttpResourceUrls
  ): void {
    this.knownHttpResourceUrls = {
      ...this.knownHttpResourceUrls,
      ...(entityHttpResourceUrls || {})
    };
  }
}
