import { useUnit } from 'effector-solid';
import { ParentComponent } from 'solid-js';

import { elementsModel } from '@/entities/Element';
import { useDragEnd } from '@/shared/hooks';

export const Board: ParentComponent = (props) => {
  const setPos = useUnit(elementsModel.setPosition);

  useDragEnd((x, y, { draggable }) => {
    setPos({ id: draggable.id.toString(), x, y });
  });

  return (
    <div class='relative h-full min-h-screen w-full overflow-hidden'>
      {props.children}
    </div>
  );
};
