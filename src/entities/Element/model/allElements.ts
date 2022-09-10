import { createEffect, createStore } from 'effector';

import { Element, localApi } from '@/shared/api';

const getAllElementsFx = createEffect<void, Element[]>(async () => {
  const data = await localApi.getElements();

  return data;
});

const $allElements = createStore<Element[]>([]);

$allElements.on(getAllElementsFx.doneData, (_, payload) => payload);

const $allElementsCount = $allElements.map((elements) => elements.length);

export { $allElements, $allElementsCount, getAllElementsFx };
