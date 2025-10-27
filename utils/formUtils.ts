import { AnyObjectSchema, ArraySchema, ValidationError } from 'yup';
import { i18n } from 'next-i18next';

export interface FormError {
  name: string;
  message: string;
}

interface formData {
  username?: string;
  email?: string;
  password?: string;
  passwordValidation?: string;
  resetCode?: string;
}

export const getErrorsMessages = (errorsArray: Array<FormError>, inputName: string) => {
  return errorsArray.filter((error) => error.name === inputName).map((error) => error.message);
};

export const validateFormData = (
  schema: AnyObjectSchema | ArraySchema<any, any, any, any>,
  formData: formData
) => {
  return new Promise<FormError[] | null>((resolve, reject) => {
    schema
      .validate(formData, { abortEarly: false })
      .then(() => resolve(null))
      .catch((errors: ValidationError) => {
        const errorsArray: FormError[] = errors.inner.map((error) => ({
          name: error.path ?? '',
          message: i18n?.t(error.message) ?? error.message,
        }));
        reject(errorsArray);
      });
  });
};
