import { createEffect, createStore } from 'effector';

import { Element, localApi } from '@/shared/api';

const getElementsFx = createEffect<void, Element[]>(async () => {
  const data = await localApi.getElements();

  return data;
});

const $elements = createStore<Element[]>([]).on(
  getElementsFx.doneData,
  (_, payload) => payload,
);

export { $elements, getElementsFx };
