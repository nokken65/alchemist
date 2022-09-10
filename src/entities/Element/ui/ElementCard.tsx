import { createDraggable } from '@thisbeyond/solid-dnd';
import { clsx } from 'clsx';
import { Component, splitProps } from 'solid-js';

import { ActiveElement } from '../model/models';

type ElementCardProps = ActiveElement;

export const ElementCard: Component<ElementCardProps> = (_props) => {
  const [{ id, slug, text, x, y }, props] = splitProps(_props, [
    'id',
    'slug',
    'text',
    'x',
    'y',
  ]);

  const drag = createDraggable(id, { id, slug, x, y });

  const style = {
    left: `${x}px`,
    top: `${y}px`,
  };

  return (
    <div
      use:drag
      style={style}
      class={clsx(
        'absolute flex w-16 touch-manipulation select-none flex-col border-2 border-dashed border-red-500',
      )}
    >
      <img alt={text} draggable={false} src={`images/${slug}.webp`} />
      <p class='break-words text-center'>{text}</p>
    </div>
  );
};
