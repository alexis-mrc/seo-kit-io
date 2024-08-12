import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideHighlightOptions} from "ngx-highlightjs";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
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
    }),
  ],
};
