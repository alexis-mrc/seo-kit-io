import {MetaDefinition} from '@angular/platform-browser';
import {Metatags} from "./metatags.model";
import {seokWebsiteName} from "@seo-kit-boilerplate/seok-generated/settings";

export class MetatagsBuilder {

  /**
   * Return the title from the data
   * @param data the seo data
   */
  public static getTitle(data: Metatags) {
    return data.title;
  }

  /**
   * Return all the tags needed from the data
   * @param data the seo
   */
  public static getTags(data: Metatags) {
    const tags: MetaDefinition[] = [];
    tags.push(MetatagsBuilder.getTagName('robots', 'index, follow'));

    if (!!data.title) {
      tags.push(MetatagsBuilder.getTagName('title', data.title));
      tags.push(MetatagsBuilder.getTagProperty('og:title', data.title));
      tags.push(MetatagsBuilder.getTagProperty('twitter:title', data.title));
    }
    if (!!data.description) {
      tags.push(MetatagsBuilder.getTagName('description', data.description));
      tags.push(MetatagsBuilder.getTagProperty('og:description', data.description));
      tags.push(MetatagsBuilder.getTagProperty('twitter:description', data.description));
    }

    if (!!data.image) {
      tags.push(MetatagsBuilder.getTagProperty('og:image', data.image));
      tags.push(MetatagsBuilder.getTagProperty('twitter:image', data.image));
    }

    if (!!data.og) {
      if (!!data.og.type) {
        tags.push(MetatagsBuilder.getTagProperty('og:type', data.og.type));
      }
      if (!!data.og.site_name) {
        tags.push(MetatagsBuilder.getTagProperty('og:site_name', data.og.site_name));
      } else {
        tags.push(MetatagsBuilder.getTagProperty('og:site_name', seokWebsiteName));
      }
    }

    if (!!data.twitter) {
      if (!!data.twitter.card) {
        tags.push(MetatagsBuilder.getTagProperty('twitter:card', data.twitter.card));
      }
      if (!!data.twitter.site) {
        tags.push(MetatagsBuilder.getTagProperty('twitter:site', data.twitter.site));
      }
      if (!!data.twitter.creator) {
        tags.push(MetatagsBuilder.getTagProperty('twitter:creator', data.twitter.creator));
      }
    }

    return tags;
  }

  /**
   * Return a MetaDefinition with a name and a content
   * @param name the name of the meta
   * @param content the content of the meta
   */
  private static getTagName(name: string, content: string): MetaDefinition {
    return {name, content};
  }

  /**
   * Return a MetaDefinition with a property and a content
   * @param property property name of the meta
   * @param content the content of the meta
   */
  private static getTagProperty(property: string, content: string): MetaDefinition {
    return {property, content};
  }

  /**
   * Return all the existing tags used
   */
  public static getAllTagsSelectors(): string[] {
    return [
      'name="robots"',
      'name="title"',
      'property="og:title"',
      'property="twitter:title"',
      'name="description"',
      'property="og:description"',
      'property="twitter:description"',
      'property="og:url"',
      'property="twitter:url"',
      'property="og:image"',
      'property="twitter:image"',
      'property="og:type"',
      'property="og:site_name"',
      'property="twitter:card"',
      'property="twitter:site"',
      'property="twitter:creator"'
    ];
  }
}
