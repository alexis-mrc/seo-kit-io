import {WithContext, WebSite, Organization} from 'schema-dts';
import {
  seokContactEmail,
  seokCreationDate, seokLogoHeight,
  seokLogoUrl, seokLogoWidth,
  seokWebsiteName,
  seokWebsiteUrl
} from "@seo-kit-boilerplate/seok-generated/settings";

const website: WithContext<WebSite> | undefined = seokWebsiteName && seokWebsiteUrl ? {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: seokWebsiteName,
  url: seokWebsiteUrl,
} : undefined;

const publisher: Organization | undefined = seokWebsiteName && seokWebsiteUrl ? {
  '@type': 'Organization',
  name: seokWebsiteName,
  url: seokWebsiteUrl,
  ...(seokCreationDate ? {
    foundingDate: seokCreationDate
  } : {}),
  ...(seokLogoUrl && seokLogoWidth && seokLogoHeight ? {
    logo: {
      '@type': 'ImageObject',
      url: seokLogoUrl,
      width: seokLogoWidth,
      height: seokLogoHeight
    }
  } : {}),
  ...(seokContactEmail ? {
    email: seokContactEmail
  } : {}),
} : undefined;

export type JsonLdDefaultType = {
  website?: WithContext<WebSite>,
  publisher?: Organization
};

export const JsonLdData: JsonLdDefaultType = {
  ...(website ? {
    website: website
  } : {}),
  ...(publisher ? {
    publisher: publisher
  } : {}),
};
