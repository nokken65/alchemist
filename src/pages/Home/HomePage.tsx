import { DragEndEvent } from '@dnd-kit/core';
import { list } from '@effector/reflect';
import { useUnit } from 'effector-react';
import { useCallback } from 'react';

import { Board } from '@/entities/Board';
import { ElementCard, elementsModel } from '@/entities/Element';

const Elements = list({
  source: elementsModel.$activeElements,
  view: ElementCard,
});

const HomePage = () => {
  const genBaseElements = useUnit(elementsModel.generateBaseElements);
  const setPos = useUnit(elementsModel.setPosition);
  const createEl = useUnit(elementsModel.createElement);

  const handleDragEnd = useCallback<(event: DragEndEvent) => void>(
    ({ delta, collisions, active }) => {
      const id = active.data.current?.id;
      const collision = collisions?.at(-1);
      const activeX = active.data.current?.x ?? 0;
      const activeY = active.data.current?.y ?? 0;

      if (collision) {
        createEl({
          activeId: id,
          targetId: collision.data?.droppableContainer.data.current.id,
        });
      }

      setPos({
        id,
        x: activeX + delta.x,
        y: activeY + delta.y,
      });
    },
    [],
  );

  return (
    <Board onDoubleClick={genBaseElements} onDragEnd={handleDragEnd}>
      <Elements />
    </Board>
  );
};

export default HomePage;
