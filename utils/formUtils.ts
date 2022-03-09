import { ObjectSchema, ValidationError } from 'yup';
import { ObjectShape } from 'yup/lib/object';

interface FormError {
  name: string;
  message: string;
}

interface formData {
  username: string;
  email: string;
  password: string;
  passwordValidation: string;
}

export const getErrorsMessages = (errorsArray: Array<FormError>, inputName: string) => {
  return errorsArray.filter((error) => error.name === inputName).map((error) => error.message);
};

export const validateFormData = (schema: ObjectSchema<ObjectShape>, formData: formData) => {
  return new Promise((resolve, reject) => {
    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        resolve(null);
      })
      .catch((errors) => {
        const errorsArray = errors.inner.map((error: ValidationError) => ({
          name: error.path,
          message: error.message,
        }));
        reject(errorsArray);
      });
  });
};
