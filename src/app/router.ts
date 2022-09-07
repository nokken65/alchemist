import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';

import { routes } from '@/shared/config/routes';

const history = createBrowserHistory();

const router = createHistoryRouter({ routes });

router.setHistory(history);

export { router };
