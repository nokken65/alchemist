import { Route } from 'atomic-router-react';
import { lazy, PropsWithChildren, Suspense } from 'react';

import { homeRoute } from '@/shared/config/routes';

const HomePage = lazy(() => import('./HomePage'));

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-full min-h-screen w-full flex-col items-center justify-between'>
      {children}
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
