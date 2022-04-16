import uniqid from 'uniqid';
import client from '../../apollo-client';
import { i18n } from 'next-i18next';
import { SET_VALIDATION_EMAIL_TOKEN } from '../../queries/signup.queries';
import { SET_PASSWORD_RESET_CODE } from '../../queries/passwordAssistance.queries';

export const getSignUpMessage = async (userId: string, email: string, username: string) => {
  const validationEmailToken = uniqid();

  const setValidationEmailToken = await client.mutate({
    mutation: SET_VALIDATION_EMAIL_TOKEN,
    variables: { id: userId, validationEmailToken: validationEmailToken },
  });

  const validationToken = setValidationEmailToken.data.updatePlayer.validationEmailToken;

  const signUpMessage = {
    from: '"WingCo App" <wingspan.companion@gmail.com>',
    to: email,
    subject: i18n?.t('email:signUpEmailSubject'),
    html: i18n?.t('email:signUpEmail', { username, domain: process.env.WEB_URI, validationToken }),
  };

  return signUpMessage;
};

export const getResetPasswordMessage = async (email: string) => {
  // Generate a string of 8 random characters (letters and numbers)
  const resetCode = Math.random().toString(36).substring(2, 10).toUpperCase();

  const setPasswordResetCode = await client.mutate({
    mutation: SET_PASSWORD_RESET_CODE,
    variables: { email: email, passwordResetCode: resetCode },
  });

  const { name, passwordResetCode } = setPasswordResetCode.data.updatePlayer;

  const resetPasswordMessage = {
    from: '"WingCo App" <wingspan.companion@gmail.com>',
    to: email,
    subject: i18n?.t('email:resetPasswordEmailSubject'),
    html: i18n?.t('email:resetPasswordEmail', { name, passwordResetCode }),
  };

  return resetPasswordMessage;
};
