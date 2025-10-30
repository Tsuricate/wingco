import { HiOutlineMail } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';

interface SignUpFormProps {
  name: 'username' | 'email' | 'password' | 'passwordValidation';
  label: string;
  helperText: string;
  startElement?: React.ReactNode;
}

export const signUpForm: SignUpFormProps[] = [
  {
    name: 'username',
    label: 'common:usernameLabel',
    helperText: 'common:usernameHelperText',
    startElement: <FiUser />,
  },
  {
    name: 'email',
    label: 'common:emailLabel',
    helperText: 'common:emailHelperText',
    startElement: <HiOutlineMail />,
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
