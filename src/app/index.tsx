import './index.scss';

import { Routing } from '@/pages';

import { withProviders } from './providers';
import { router } from './router';

const App = () => {
  return <Routing />;
};

export default withProviders({ router })(App);
