interface signUpFormProps {
  name: 'username' | 'email' | 'password' | 'passwordValidation';
  label: string;
  helperText: string;
}

export const signUpForm: Array<signUpFormProps> = [
  {
    name: 'username',
    label: 'common:usernameLabel',
    helperText: 'common:usernameHelperText',
  },
  {
    name: 'email',
    label: 'common:emailLabel',
    helperText: 'common:emailHelperText',
  },
  {
    name: 'password',
    label: 'signUp:passwordLabel',
    helperText: 'signUp:passwordHelperText',
  },
  {
    name: 'passwordValidation',
    label: 'signUp:passwordLabelValidation',
    helperText: 'signUp:passwordValidationHelperText',
  },
];
