import { createEffect, createStore } from 'effector';

import { Element, localApi } from '@/shared/api';

const getAllElementsFx = createEffect<void, Element[]>(async () => {
  const data = await localApi.getElements();

  return data;
});

const $allElements = createStore<Element[]>([]).on(
  getAllElementsFx.doneData,
  (_, payload) => payload,
);

export { $allElements, getAllElementsFx };
