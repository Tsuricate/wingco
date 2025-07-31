import * as yup from 'yup';

const email = yup.string().email('validations:emailFormat').required('validations:fieldRequired');
const username = yup.string().min(2, 'validations:usernameLength').required('validations:fieldRequired');

const password = yup
  .string()
  .min(5, 'validations:passwordMin')
  .max(20, 'validations:passwordMax')
  .matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
    'validations:passwordSecurity'
  )
  .required('validations:fieldRequired');

const passwordValidation = yup
  .string()
  .oneOf([yup.ref('password')], 'validations:passwordValidation')
  .required('validations:fieldRequired');

export const resetCodeValidationSchema = yup.object({
  resetCode: yup.string().length(8, 'validations:resetCodeLength').required('validations:fieldRequired'),
});

export const emailValidationSchema = yup.object({
  email,
});

export const manageAccountValidationSchema = yup.object({
  username,
  email,
});

export const passwordValidationSchema = yup.object({
  password,
  passwordValidation,
});

export const signUpSchema = yup.object({
  username,
  email,
  password,
  passwordValidation,
});
