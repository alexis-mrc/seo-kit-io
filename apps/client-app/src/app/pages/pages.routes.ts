import {
  url as ExamplePillarUrl,
  state as ExamplePillarState,
} from './example-pillar/example-pillar.page';
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
  ...('published' === ExamplePillarState
    ? [
        {
          path: ExamplePillarUrl,
          loadComponent: () =>
            import('./example-pillar/example-pillar.component').then(
              (m) => m.ExamplePillarComponent
            ),
          data: {
            sitemap: 'example-pillar/example-pillar.sitemap.json',
          },
        },
      ]
    : []),
];
