import { create } from 'xmlbuilder';
import { Routes } from "@angular/router";
import { isSitemapData } from "./sitemap.model";
const fs = require('node:fs');
const path = require('node:path');

export const generateSitemap = (routes: Routes, baseUrl: string, pagesDirname: string): string => {
  const root = create('urlset', {version: '1.0', encoding: 'UTF-8'});
  root.att('xmlns', 'https://www.sitemaps.org/schemas/sitemap/0.9');

  routes.forEach(route => {
    if (route.path !== '*' && route.path !== '**' && (route.path || route.path === '')) {
      const url = root.ele('url');
      url.ele('loc', `${baseUrl}/${route.path}`);

      if (route.data?.['sitemap']) {
        const sitemapPath = path.resolve(pagesDirname + route.data?.['sitemap']);
        try {

          const sitemapData = JSON.parse(fs.readFileSync(sitemapPath, 'utf8'));

          if (isSitemapData(sitemapData)) {
            if (sitemapData.lastmod) {
              url.ele('lastmod', sitemapData.lastmod);
            }
            if (sitemapData.changefreq) {
              url.ele('changefreq', sitemapData.changefreq);
            }
            if (sitemapData.priority) {
              url.ele('priority', sitemapData.priority);
            }
            if (sitemapData.images && Array.isArray(sitemapData.images) && sitemapData.images.length > 0) {
              for (const image of sitemapData.images) {
                if (image && image.loc) {
                  const imgEl = url.ele('image:image');
                  imgEl.ele('image:loc', image.loc);

                  if (image.caption) {
                    imgEl.ele('image:caption', image.caption);
                  }
                  if (image.title) {
                    imgEl.ele('image:title', image.title);
                  }
                }
              }
            }
          }
        } catch(e) {
          console.log(`\x1b[31mError loading ${sitemapPath}`);
        }
      }
    }
  })

  return root.end({pretty: true});
};
