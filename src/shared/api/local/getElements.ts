import { ValidationError } from 'runtypes';

import { Element, ElementsArray } from './models';

export const getElements = async (): Promise<Element[]> => {
  const res = await fetch(window.origin + '/elements.json');
  const data = await res.json();

  const elementsArray = ElementsArray.check(data);

  if (elementsArray instanceof ValidationError) {
    console.error(elementsArray);

    return [];
  }

  return elementsArray;
};
