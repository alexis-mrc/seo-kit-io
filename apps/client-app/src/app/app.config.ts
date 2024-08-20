import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { SEO_KIT_STYLE } from '@seo-kit-boilerplate/seok-ui';
import {provideUpdateMetatags} from "@seo-kit-boilerplate/seok-core/metatags";
import {seokGlobalStyle} from "@seo-kit-boilerplate/seok-generated/settings";
import { provideHighlightOptions } from 'ngx-highlightjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })),
    provideUpdateMetatags(),
    {
      provide: SEO_KIT_STYLE, useValue: seokGlobalStyle
    },
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'), // Optional, add line numbers if needed
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml'),
        shell: () => import('highlight.js/lib/languages/shell'),
        json: () => import('highlight.js/lib/languages/json')
      }
    })
  ],
};
