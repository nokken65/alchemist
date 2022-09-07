import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core';
import { clsx } from 'clsx';
import { useUnit } from 'effector-react';
import { memo } from 'react';

import { Element } from '@/shared/api';
import { useCombinedRefs } from '@/shared/hooks';

import { setPosition } from '../model';
import { Pos } from '../model/models';

type ElementCardProps = Element & Pos;

const ElementCardView = ({ x, y, id, class: slug, text }: ElementCardProps) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef: asDrag,
    transform,
  } = useDraggable({
    id: `drag-${id}`,
    data: { id, x, y, slug },
  });

  const { setNodeRef: asDrop } = useDroppable({
    id: `drop-${id}`,
    data: { id, x, y, slug },
  });

  const setNodeRef = useCombinedRefs(asDrag, asDrop);

  const setPos = useUnit(setPosition);

  useDndMonitor({
    onDragEnd: ({ delta, collisions, active }) => {
      if (isDragging) {
        const collistion = collisions?.at(-1);

        // console.log({
        //   class: collisions?.at(-1)?.data?.droppableContainer.data.current.slug,
        // });

        setPos({
          id,
          x: x + delta.x,
          y: y + delta.y,
        });
      }
    },
  });

  const style = {
    transform: `translate3d(${transform ? transform.x + x : x}px, ${
      transform ? transform.y + y : y
    }px, 0)`,
  };

  return (
    <div
      className={clsx(
        'absolute flex w-16 touch-manipulation select-none flex-col border-2 border-dashed border-red-500',
        isDragging && 'z-10',
      )}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <img alt={text} draggable={false} src={`images/${slug}.webp`} />
      <p className='break-words text-center'>{text}</p>
    </div>
  );
};

export const ElementCard = memo(ElementCardView);
