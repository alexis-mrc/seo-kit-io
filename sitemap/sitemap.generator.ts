import { appRoutes } from '../apps/client-app/src/app/app.routes';
import {generateSitemap} from "../libs/seok-core/src/lib/sitemap";
import {seokWebsiteUrl} from "@seo-kit-boilerplate/seok-generated/settings";
const fs = require('node:fs');

const rootDirname = __dirname + '/../apps/client-app/src/app/pages/';

const sitemapString = generateSitemap(appRoutes, seokWebsiteUrl, rootDirname);

fs.writeFile(`./apps/client-app/src/generated/public/sitemap.xml`, sitemapString, (err: any) => {
  if (err) {
    console.error(err);
  } else {
    console.log('\x1b[32msitemap.xml written\x1b[90m to ./apps/client-app/src/generated/public/sitemap.xml');
  }
});

