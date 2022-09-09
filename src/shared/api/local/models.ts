import { Array, Boolean, Record, Static, String, Tuple } from 'runtypes';

const RecipeTuple = Tuple(String, String);

export const ElementObject = Record({
  isBase: Boolean.optional(),
  slug: String,
  text: String,
  description: String,
  recipe: Array(RecipeTuple),
});

export const ElementsArray = Array(ElementObject);

export type Element = Static<typeof ElementObject>;
