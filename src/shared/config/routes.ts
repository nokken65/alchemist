import { createRoute } from 'atomic-router';

export const homeRoute = createRoute();
export const notFoundRoute = createRoute();

export const routes = [
  { path: '/', route: homeRoute },
  { path: '/404', route: notFoundRoute },
];
