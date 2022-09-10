import { render } from 'solid-js/web';

import App from '@/app';

const appRootContainer = document.getElementById('app-root');

if (!appRootContainer) {
  throw new Error("Cannot find '#app-root' element!");
}

render(App, appRootContainer);
