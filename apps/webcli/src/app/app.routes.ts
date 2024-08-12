import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'styles',
    loadComponent: () => import('./styles/styles.component').then(c => c.StylesComponent)
  },
  {
    path: 'assets',
    loadComponent: () => import('./assets/assets.component').then(c => c.AssetsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent)
  },
  {
    path: 'components',
    loadComponent: () => import('./components/components.component').then(c => c.ComponentsComponent)
  },
  {
    path: 'pages',
    loadComponent: () => import('./pages/pages.component').then(c => c.PagesComponent)
  },
  {
    path: 'deploy',
    loadComponent: () => import('./deploy/deploy.component').then(c => c.DeployComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
