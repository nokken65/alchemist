import { createHistoryRouter } from 'atomic-router';

import compose from '@/shared/utils/compose';

import { withRouter } from './withRouter';

type ProvidersProps = {
  router: ReturnType<typeof createHistoryRouter>;
};

export const withProviders = ({ router }: ProvidersProps) =>
  compose(withRouter(router));
