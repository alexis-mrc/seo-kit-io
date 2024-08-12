import {MetatagsBuilder} from './metatags.builder';
import {Metatags} from "./metatags.model";

describe('SeoBuilder', () => {
  it('should get the title', () => {
    // GIVEN
    // @ts-ignore
    const data: Metatags = {
      title: 'thetitle',
      description: 'thedescription'
    };

    // THEN
    expect(MetatagsBuilder.getTitle(data)).toEqual('thetitle');
  });

  it('should get the tags', () => {
    // GIVEN
    // @ts-ignore
    const data: Metatags = {
      title: 'titleTest',
      description: 'descTest',
      image: 'imgTest',
      og: {
        type: 'ogtypetest',
        site_name: 'ogsitenametest',
        url: 'ogurl'
      },
      twitter: {
        card: 'twittercardtest',
        site: 'twittersitetest',
        creator: 'twittercardcreator'
      }
    };

    // THEN
    expect(MetatagsBuilder.getTags(data)).toEqual([
      {name: 'robots', content: 'index, follow'},

      {name: 'title', content: 'titleTest'},
      {property: 'og:title', content: 'titleTest'},
      {property: 'twitter:title', content: 'titleTest'},

      {name: 'description', content: 'descTest'},
      {property: 'og:description', content: 'descTest'},
      {property: 'twitter:description', content: 'descTest'},

      {property: 'og:image', content: 'imgTest'},
      {property: 'twitter:image', content: 'imgTest'},

      {property: 'og:type', content: 'ogtypetest'},
      {property: 'og:site_name', content: 'ogsitenametest'},
      {property: 'og:url', content: 'ogurl'},

      {property: 'twitter:card', content: 'twittercardtest'},
      {property: 'twitter:site', content: 'twittersitetest'},
      {property: 'twitter:creator', content: 'twittercardcreator'},
    ]);
  });
});
