import {
  ClientRect,
  CollisionDescriptor,
  CollisionDetection,
} from '@dnd-kit/core';

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

      if (intersectionRatio > 0) {
        collisions.push({
          id,
          data: { droppableContainer, value: intersectionRatio },
        });
      }
    }
  }

  return collisions.sort(sortCollisionsDesc);
};

function getIntersectionRatio(entry: ClientRect, target: ClientRect): number {
  const top = Math.max(target.top, entry.top);
  const left = Math.max(target.left, entry.left);
  const right = Math.min(target.left + target.width, entry.left + entry.width);
  const bottom = Math.min(target.top + target.height, entry.top + entry.height);
  const width = right - left;
  const height = bottom - top;

  if (left < right && top < bottom) {
    const targetArea = target.width * target.height;
    const entryArea = entry.width * entry.height;
    const intersectionArea = width * height;
    const intersectionRatio =
      intersectionArea / (targetArea + entryArea - intersectionArea);

    return Number(intersectionRatio.toFixed(4));
  }

  return 0;
}

function sortCollisionsDesc(
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor,
) {
  return b - a;
}
