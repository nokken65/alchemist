import {
  Array,
  Boolean,
  Number,
  Record,
  Static,
  String,
  Tuple,
} from 'runtypes';

const RecipeTuple = Tuple(String, String);

export const ElementObject = Record({
  id: Number,
  isBase: Boolean.optional(),
  class: String,
  text: String,
  description: String,
  recipe: Array(RecipeTuple),
});

export const ElementsArray = Array(ElementObject);

export type Element = Static<typeof ElementObject>;
