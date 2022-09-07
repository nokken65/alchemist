import {
  Input as InputContainer,
  InputProps as InputContainerProps,
} from '@nextui-org/react';
import { Controller, ControllerInjectedResult } from 'effector-react-form';
import { memo } from 'react';

type InputProps = Omit<
  InputContainerProps,
  keyof ControllerInjectedResult['input']
> & {
  controller: Controller;
};

const InputView = ({ controller, ...props }: InputProps) => {
  const { input, error, isShowError } = controller();

  return (
    <InputContainer
      {...props}
      {...input}
      helperColor='error'
      helperText={error ?? ''}
      status={isShowError ? 'error' : 'default'}
    />
  );
};

export const Input = memo(InputView);
