import { DragDropProvider, DragDropSensors } from '@thisbeyond/solid-dnd';
import { useUnit } from 'effector-solid';
import { For } from 'solid-js';

import { Board } from '@/entities/Board';
import { ElementCard, elementsModel } from '@/entities/Element';

const HomePage = () => {
  const elements = useUnit(elementsModel.$activeElements);

  return (
    <DragDropProvider>
      <DragDropSensors>
        <Board>
          <For each={elements()}>{(el) => <ElementCard {...el} />}</For>
        </Board>
      </DragDropSensors>
    </DragDropProvider>
  );
};

export default HomePage;
