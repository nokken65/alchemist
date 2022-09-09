import {
  ClientRect,
  CollisionDescriptor,
  CollisionDetection,
} from '@dnd-kit/core';

import { getIntersectionRatio, sortCollisionsDesc } from './helpers';

export const collisionDetection: CollisionDetection = (args) => {
  const {
    active: actv,
    collisionRect: colRect,
    droppableContainers,
    droppableRects,
  } = args;

  const collisionRect: ClientRect = {
    ...colRect,
    left: actv.data.current?.x
      ? actv.data.current?.x + colRect.left
      : colRect.left,
    top: actv.data.current?.y
      ? actv.data.current?.y + colRect.top
      : colRect.top,
  };

  const collisions: CollisionDescriptor[] = [];

  for (const droppableContainer of droppableContainers) {
    const { id, data } = droppableContainer;
    const rct = droppableRects.get(id);

    if (rct && actv.data.current?.id !== data.current?.id) {
      const rect: ClientRect = {
        ...rct,
        left: droppableContainer.data.current?.x
          ? droppableContainer.data.current.x
          : rct.left,
        top: droppableContainer.data.current?.y
          ? droppableContainer.data.current.y
          : rct.top,
      };

      const intersectionRatio = getIntersectionRatio(rect, collisionRect);

      if (intersectionRatio > 0.3) {
        collisions.push({
          id,
          data: { droppableContainer, value: intersectionRatio },
        });
      }
    }
  }

  return collisions.sort(sortCollisionsDesc);
};
