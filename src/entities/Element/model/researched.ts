import { createEvent, createStore, sample } from 'effector';

import { Element } from '@/shared/api';

import { getElementsFx } from './elements';
import { Pos } from './models';

const setPosition = createEvent<Pick<Element, 'id'> & Pos>();
const createElement = createEvent<{
  activeId: Element['id'];
  targetId: Element['id'];
}>();

const $researched = createStore<Element[]>([]);
const $onboarded = createStore<(Element & Pos)[]>([]);

$onboarded.on(setPosition, (state, { id, ...pos }) =>
  state.map((el) =>
    el.id === id
      ? {
          ...el,
          ...pos,
        }
      : el,
  ),
);

sample({
  clock: getElementsFx.doneData,
  filter: (elements) => !!elements.length,
  fn: (elements) => elements.filter((el) => el.isBase),
  target: $researched,
});

sample({
  clock: getElementsFx.doneData,
  filter: (elements) => !!elements.length,
  fn: (elements) => elements.filter((el) => el.isBase),
  target: $researched,
});

sample({
  clock: getElementsFx.doneData,
  filter: (elements) => !!elements.length,
  fn: (elements) =>
    elements.filter((el, i) => i < 4).map((el) => ({ ...el, x: 0, y: 0 })),
  target: $onboarded,
});

export { $onboarded, $researched, setPosition };
