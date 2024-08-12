import {inject, InjectionToken} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import {MetatagsBuilder} from './metatags.builder';
import {Metatags} from "./metatags.model";

export type updateMetatagsFnType = (data: Metatags) => void;

/**
 * Token UPDATE_METATAGS
 * Useful to simplify testing
 */
export const UPDATE_METATAGS = new InjectionToken<updateMetatagsFnType>('UPDATE_METATAGS');

/**
 * Provide UPDATE_METATAGS token
 */
export const provideUpdateMetatags = () => ({
  provide: UPDATE_METATAGS, useValue: internalUpdateMetatags
})

/**
 * Update the Metatags for the page
 * @param data the Metatags
 * Must be called in an injection context
 */
export const updateMetatags: updateMetatagsFnType = (data: Metatags) => {
  inject(UPDATE_METATAGS)(data);
}

/**
 * Internal : Update the SEO for the page
 * @param data the seo data
 * Must be called in an injection context
 */
const internalUpdateMetatags: updateMetatagsFnType = (data: Metatags) => {
  inject(Title).setTitle(MetatagsBuilder.getTitle(data));
  const meta = inject(Meta);
  internalRemoveTags(meta);
  meta.addTags(MetatagsBuilder.getTags(data));
}

/**
 * Internal : Remove all tags set by MetatagsBuilder
 * @param meta
 */
const internalRemoveTags = (meta: Meta) => {
  const tags: string[] = MetatagsBuilder.getAllTagsSelectors();

  for (const tag of tags) {
    if (meta.getTag(tag)) {
      meta.removeTag(tag);
    }
  }
}
