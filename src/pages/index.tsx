import './init';

import { Route } from 'atomic-router-solid';
import { lazy, ParentComponent, Suspense } from 'solid-js';

import { homeRoute } from '@/shared/config/routes';

const HomePage = lazy(() => import('./Home'));

const Layout: ParentComponent = (props) => {
  return (
    <div class='flex h-full min-h-screen w-full flex-col items-center justify-between'>
      {props.children}
    </div>
  );
};

export const Routing = () => {
  return (
    <Layout>
      <Suspense fallback='Loading...'>
        <Route route={homeRoute} view={HomePage} />
      </Suspense>
    </Layout>
  );
};
