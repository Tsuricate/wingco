import * as yup from 'yup';

const email = yup.string().email('validations:emailFormat').required('validations:fieldRequired');
const username = yup
  .string()
  .min(2, 'validations:usernameLength')
  .required('validations:fieldRequired');

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
  .oneOf([yup.ref('password'), null], 'validations:passwordValidation')
  .required('validations:fieldRequired');

export const resetCodeValidationSchema = yup.object().shape({
  resetCode: yup
    .string()
    .length(8, 'validations:resetCodeLength')
    .required('validations:fieldRequired'),
});

export const emailValidationSchema = yup.object().shape({
  email,
});

export const passwordValidationSchema = yup.object().shape({
  password,
  passwordValidation,
});

export const signUpSchema = yup.object().shape({
  username,
  email,
  password,
  passwordValidation,
});
