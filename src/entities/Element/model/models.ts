import type { Element } from '@/shared/api';

export type Pos = {
  x: number;
  y: number;
};

export type ActiveElement = Element & { id: string } & Pos;
