import { ClientRect, CollisionDescriptor } from '@dnd-kit/core';

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getIntersectionRatio = (
  entry: ClientRect,
  target: ClientRect,
): number => {
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
};

export const sortCollisionsDesc = (
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor,
) => {
  return b - a;
};
