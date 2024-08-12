import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { SEO_KIT_STYLE } from '@seo-kit-boilerplate/seok-ui';
import {provideUpdateMetatags} from "@seo-kit-boilerplate/seok-core/metatags";
import {seokGlobalStyle} from "@seo-kit-boilerplate/seok-generated/settings";

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
    }
  ],
};
