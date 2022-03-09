import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  username: yup.string().min(2).required(),
  email: yup.string().email(),
  password: yup
    .string()
    .min(5)
    .max(12)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special case character !'
    )
    .required('Password must be defined'),
  passwordValidation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
});
