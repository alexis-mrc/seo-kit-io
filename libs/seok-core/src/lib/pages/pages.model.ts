import {SitemapData} from "@seo-kit-boilerplate/seok-core/sitemap";
import {Metatags} from "@seo-kit-boilerplate/seok-core/metatags";

export type SeokPageState = 'published' | 'draft' | 'archived';

export interface SeokPage {
  id: string;

  /**
   * Url to access the page
   */
  url: string;

  /**
   * State of the page
   */
  state: SeokPageState;

  /**
   * Lang of the page
   */
  lang: string;

  /**
   * Sitemap informations of the page
   */
  sitemap: SitemapData;

  /**
   * Metatags of the page
   */
  metatags: Metatags;
}
