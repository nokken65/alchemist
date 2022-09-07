import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { Board } from '@/entities/Board';
import { ElementCard, elementsModel } from '@/entities/Element';

const HomePage = () => {
  const elements = useUnit(elementsModel.$onboarded);

  useEffect(() => {
    elementsModel.getElementsFx();
  }, []);

  return (
    <Board>
      {elements.map((el) => (
        <ElementCard {...el} key={el.id} />
      ))}
    </Board>
  );
};

export default HomePage;
