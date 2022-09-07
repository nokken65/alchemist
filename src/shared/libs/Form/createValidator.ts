import type {
  AnyState,
  ErrorsInline,
  FormValidate,
  FormValidateParams,
} from 'effector-react-form';
import type { ObjectType } from 'myzod';
import { ValidationError } from 'myzod';

export const createValidator = <T extends AnyState, R>(
  schema: ObjectType<T>,
): FormValidate<R, any> => {
  const validate = ({ values }: FormValidateParams<R, any>): ErrorsInline => {
    const errors: ErrorsInline = {};

    try {
      const res = schema.collectErrors().try(values);

      if (res instanceof ValidationError) {
        for (const key in res.collectedErrors) {
          errors[key] = res.collectedErrors[key]?.message ?? null;
        }
      }
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }

    return errors;
  };

  return validate;
};
