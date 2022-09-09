import { sample } from 'effector';

import { elementsModel } from '@/entities/Element';
import { homeRoute } from '@/shared/config/routes';

sample({
  clock: homeRoute.opened,
  target: elementsModel.getAllElementsFx,
});
