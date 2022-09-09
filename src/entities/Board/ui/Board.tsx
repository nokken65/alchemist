import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { memo, PropsWithChildren } from 'react';

import { collisionDetection, restrictToWindowBorders } from '@/shared/utils';

const BoardView = ({
  children,
  onDoubleClick,
  onDragEnd,
}: PropsWithChildren<{
  onDoubleClick?: () => void;
  onDragEnd?: (event: DragEndEvent) => void;
}>) => {
  const pointerSensor = useSensor(PointerSensor);
  const sensors = useSensors(pointerSensor);

  return (
    <DndContext
      collisionDetection={collisionDetection}
      id='board'
      modifiers={[restrictToWindowBorders]}
      sensors={sensors}
      onDragEnd={onDragEnd}
    >
      <div
        className='relative h-full min-h-screen w-full overflow-hidden'
        onDoubleClick={onDoubleClick}
      >
        {children}
      </div>
    </DndContext>
  );
};

export const Board = memo(BoardView);
