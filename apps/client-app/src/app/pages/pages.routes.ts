import {
  url as FrAngularSeoUrl,
  state as FrAngularSeoState,
} from './fr-angular-seo/fr-angular-seo.page';
import {
  url as AngularUniversalUrl,
  state as AngularUniversalState,
} from './angular-universal/angular-universal.page';
import {
  url as AngularLatestVersionUrl,
  state as AngularLatestVersionState,
} from './angular-latest-version/angular-latest-version.page';
import { url as FrHomeUrl, state as FrHomeState } from './fr-home/fr-home.page';
import {
  url as FrPrivacyUrl,
  state as FrPrivacyState,
} from './fr-privacy/fr-privacy.page';
import {
  url as FrTermsOfServiceUrl,
  state as FrTermsOfServiceState,
} from './fr-terms-of-service/fr-terms-of-service.page';
import {
  url as FrLegalNoticeUrl,
  state as FrLegalNoticeState,
} from './fr-legal-notice/fr-legal-notice.page';
import {
  url as TermsOfServiceUrl,
  state as TermsOfServiceState,
} from './terms-of-service/terms-of-service.page';
import {
  url as PrivacyUrl,
  state as PrivacyState,
} from './privacy/privacy.page';
import {
  url as LegalNoticeUrl,
  state as LegalNoticeState,
} from './legal-notice/legal-notice.page';
import {
  url as AngularSeoUrl,
  state as AngularSeoState,
} from './angular-seo/angular-seo.page';
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
  ...('published' === AngularSeoState
    ? [
        {
          path: AngularSeoUrl,
          loadComponent: () =>
            import('./angular-seo/angular-seo.component').then(
              (m) => m.AngularSeoComponent
            ),
          data: {
            sitemap: 'angular-seo/angular-seo.sitemap.json',
          },
        },
      ]
    : []),
  ...('published' === LegalNoticeState
    ? [
        {
          path: LegalNoticeUrl,
          loadComponent: () =>
            import('./legal-notice/legal-notice.component').then(
              (m) => m.LegalNoticeComponent
            ),
          data: {
            sitemap: 'legal-notice/legal-notice.sitemap.json',
          },
        },
      ]
    : []),
  ...('published' === PrivacyState
    ? [
        {
          path: PrivacyUrl,
          loadComponent: () =>
            import('./privacy/privacy.component').then(
              (m) => m.PrivacyComponent
            ),
          data: {
            sitemap: 'privacy/privacy.sitemap.json',
          },
        },
      ]
    : []),
  ...('published' === TermsOfServiceState
    ? [
        {
          path: TermsOfServiceUrl,
          loadComponent: () =>
            import('./terms-of-service/terms-of-service.component').then(
              (m) => m.TermsOfServiceComponent
            ),
          data: {
            sitemap: 'terms-of-service/terms-of-service.sitemap.json',
          },
        },
      ]
    : []),
  ...('published' === FrLegalNoticeState
    ? [
        {
          path: FrLegalNoticeUrl,
          loadComponent: () =>
            import('./fr-legal-notice/fr-legal-notice.component').then(
              (m) => m.FrLegalNoticeComponent
            ),
          data: {
            sitemap: 'fr-legal-notice/fr-legal-notice.sitemap.json',
          },
        },
      ]
    : []),
  ...('published' === FrTermsOfServiceState
    ? [
        {
          path: FrTermsOfServiceUrl,
          loadComponent: () =>
            import('./fr-terms-of-service/fr-terms-of-service.component').then(
              (m) => m.FrTermsOfServiceComponent
            ),
          data: {
            sitemap: 'fr-terms-of-service/fr-terms-of-service.sitemap.json',
          },
        },
      ]
    : []),
  ...('published' === FrPrivacyState
    ? [
        {
          path: FrPrivacyUrl,
          loadComponent: () =>
            import('./fr-privacy/fr-privacy.component').then(
              (m) => m.FrPrivacyComponent
            ),
          data: {
            sitemap: 'fr-privacy/fr-privacy.sitemap.json',
          },
        },
      ]
    : []),
  ...('published' === FrHomeState
    ? [
        {
          path: FrHomeUrl,
          loadComponent: () =>
            import('./fr-home/fr-home.component').then(
              (m) => m.FrHomeComponent
            ),
          data: {
            sitemap: 'fr-home/fr-home.sitemap.json',
          },
        },
      ]
    : []),
  ...('published' === AngularLatestVersionState
    ? [
        {
          path: AngularLatestVersionUrl,
          loadComponent: () =>
            import(
              './angular-latest-version/angular-latest-version.component'
            ).then((m) => m.AngularLatestVersionComponent),
          data: {
            sitemap:
              'angular-latest-version/angular-latest-version.sitemap.json',
          },
        },
      ]
    : []),
  ...('published' === AngularUniversalState
    ? [
        {
          path: AngularUniversalUrl,
          loadComponent: () =>
            import('./angular-universal/angular-universal.component').then(
              (m) => m.AngularUniversalComponent
            ),
          data: {
            sitemap: 'angular-universal/angular-universal.sitemap.json',
          },
        },
      ]
    : []),
  ...('published' === FrAngularSeoState
    ? [
        {
          path: FrAngularSeoUrl,
          loadComponent: () =>
            import('./fr-angular-seo/fr-angular-seo.component').then(
              (m) => m.FrAngularSeoComponent
            ),
          data: {
            sitemap: 'fr-angular-seo/fr-angular-seo.sitemap.json',
          },
        },
      ]
    : []),
];
