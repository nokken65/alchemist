import { createStore, sample } from 'effector';

import { Element } from '@/shared/api';

import { $allElements } from './allElements';

const $researchedElements = createStore<Element[]>([]);
const $researchedElementsCount = $researchedElements.map(
  (elements) => elements.length,
);

sample({
  clock: $allElements,
  filter: (elements) => !!elements.length,
  fn: (elements) =>
    // TODO
    // elements.filter((el) => el.isBase),
    elements,
  target: $researchedElements,
});

export { $researchedElements, $researchedElementsCount };
