import { createStore, sample } from 'effector';

import { Element } from '@/shared/api';

import { $allElements } from './allElements';

const $researchedElements = createStore<Element[]>([]);

sample({
  clock: $allElements,
  filter: (elements) => !!elements.length,
  fn: (elements) =>
    // TODO
    elements.filter((el) => el.isBase),
  target: $researchedElements,
});

export { $researchedElements };
