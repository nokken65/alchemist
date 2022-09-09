import { getRandomInt } from './helpers';

export const randomPosition = () => {
  return {
    x: getRandomInt(100, window.innerWidth - 100),
    y: getRandomInt(100, window.innerHeight - 100),
  };
};
