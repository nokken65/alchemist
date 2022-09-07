import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { memo, PropsWithChildren } from 'react';

import { collisionDetection, restrictToWindowBorders } from '@/shared/utils';

const BoardView = ({ children }: PropsWithChildren) => {
  const pointerSensor = useSensor(PointerSensor);
  const sensors = useSensors(pointerSensor);

  return (
    <DndContext
      collisionDetection={collisionDetection}
      id='board'
      modifiers={[restrictToWindowBorders]}
      sensors={sensors}
    >
      <div className='relative h-full min-h-screen w-full overflow-hidden'>
        {children}
      </div>
    </DndContext>
  );
};

export const Board = memo(BoardView);
