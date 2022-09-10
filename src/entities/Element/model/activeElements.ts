import { createEvent, createStore, sample } from 'effector';
import { nanoid } from 'nanoid';

import { randomPosition } from '@/shared/utils';

import { $allElements } from './allElements';
import { ActiveElement } from './models';
import { $researchedElements } from './researchedElements';

const setPosition = createEvent<Pick<ActiveElement, 'id' | 'x' | 'y'>>();
const createElement = createEvent<{
  activeId: ActiveElement['id'];
  targetId: ActiveElement['id'];
}>();
const generateBaseElements = createEvent();

const $activeElements = createStore<ActiveElement[]>([]);
const $activeElementsCount = $activeElements.map((elements) => elements.length);

$activeElements.on(setPosition, (state, { id, ...pos }) =>
  state.map((el) =>
    el.id === id
      ? {
          ...el,
          ...pos,
        }
      : el,
  ),
);
$activeElements.watch(console.log);
sample({
  clock: createElement,
  source: { all: $allElements, exist: $activeElements },
  fn: ({ all, exist }, { activeId, targetId }) => {
    const { x, y } = exist.find((el) => el.id === targetId) ?? { x: 0, y: 0 };
    const activeSlug = exist.find((el) => el.id === activeId)?.slug;
    const targetSlug = exist.find((el) => el.id === targetId)?.slug;

    if (activeSlug && targetSlug) {
      for (const el of all) {
        for (const recipe of el.recipe) {
          const rec = recipe.sort().join(',');
          const comb = [activeSlug, targetSlug].sort().join(',');
          if (rec === comb) {
            return [
              ...exist.filter((el) => el.id !== activeId && el.id !== targetId),
              { ...el, id: nanoid(), x: x + 50, y: y + 50 },
            ];
          }
        }
      }
    }

    return exist;
  },
  target: $activeElements,
});

sample({
  clock: generateBaseElements,
  source: { all: $researchedElements, exist: $activeElements },
  fn: ({ all, exist }) => [
    ...exist,
    ...all
      .filter((el) => el.isBase)
      .map((el) => ({ ...el, id: nanoid(), ...randomPosition() })),
  ],
  target: $activeElements,
});

sample({
  clock: $researchedElements,
  filter: (elements) => !!elements.length,
  fn: (elements) =>
    elements.map((el) => ({ ...el, id: nanoid(), ...randomPosition() })),
  target: $activeElements,
});

export {
  $activeElements,
  $activeElementsCount,
  createElement,
  generateBaseElements,
  setPosition,
};
