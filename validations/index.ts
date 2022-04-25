import * as yup from 'yup';

const email = yup.string().email().required();
const password = yup
  .string()
  .min(5)
  .max(20)
  .matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special case character !'
  )
  .required('Password must be defined');

const passwordValidation = yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  .required();

export const resetCodeValidationSchema = yup.object().shape({
  resetCode: yup.string().length(8).required(),
});

export const emailValidationSchema = yup.object().shape({
  email,
});

export const passwordValidationSchema = yup.object().shape({
  password,
  passwordValidation,
});

export const signUpSchema = yup.object().shape({
  username: yup.string().min(2).required(),
  email,
  password,
  passwordValidation,
});
