import { Route } from '@angular/router';
import { pagesRoutes } from './pages/pages.routes';

export const pagesRoutesFactory = () => {
  const pathSet = new Set<string>();
  let emptyPathRoute: Route | undefined;
  for (const route of pagesRoutes) {
    if (route.path !== undefined) {
      if (pathSet.has(route.path)) {
        throw new Error(`Duplicate path found: ${route.path}`);
      }
      pathSet.add(route.path);
      if (route.path === '') {
        emptyPathRoute = route;
      }
    }
  }
  // Filter out the route with an empty path and sort the remaining routes in reverse alphabetical order
  const routesWithoutEmptyPath = pagesRoutes.filter(
    (route) => route.path !== ''
  );
  routesWithoutEmptyPath.sort((a, b) => {
    if (b.path === undefined && a.path === undefined) return 0;
    if (b.path === undefined) return -1;
    if (a.path === undefined) return 1;
    return b.path.localeCompare(a.path);
  });
  // Add the route with an empty path at the end if it exists
  if (emptyPathRoute) {
    routesWithoutEmptyPath.push(emptyPathRoute);
  }
  return routesWithoutEmptyPath;
};

export const appRoutes: Route[] = [
  ...pagesRoutesFactory(),
  {
    path: '**',
    redirectTo: ''
  }
];
