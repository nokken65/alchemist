export type ElementRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Pos = Pick<ElementRect, 'x' | 'y'>;
