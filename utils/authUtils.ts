import { comparePassword } from './api/password';
import { findVerifiedPlayerByEmail } from './api/playerUtils';

interface SignInProps {
  email: string;
  password: string;
  setErrorSignIn: (arg: boolean) => void;
}

export const signIn = async ({ email, password, setErrorSignIn }: SignInProps) => {
  try {
    const player = await findVerifiedPlayerByEmail(email);
    if (player) {
      const isPasswordValid = comparePassword(password, player.password);
      if (isPasswordValid) {
        setErrorSignIn(false);
        console.log('Valid user ! ');
      } else {
        throw new Error('Password not corresponding !');
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log('ERROR : ', err);

    setErrorSignIn(true);
  }
};
