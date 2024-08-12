import { url as HomeUrl, state as HomeState } from './home/home.page';
import { Route } from '@angular/router';
export const pagesRoutes: Route[] = [
  ...('published' === HomeState
    ? [
        {
          path: HomeUrl,
          loadComponent: () =>
            import('./home/home.component').then((m) => m.HomeComponent),
          data: {
            sitemap: 'home/home.sitemap.json',
          },
        },
      ]
    : []),
];
