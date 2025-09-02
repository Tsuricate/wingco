import uniqid from 'uniqid';
import client from '../../apollo-client';
import { i18n } from 'next-i18next';
import { SET_VALIDATION_EMAIL_TOKEN } from '../../queries/signup.queries';
import { SET_PASSWORD_RESET_CODE } from '../../queries/passwordAssistance.queries';

export const getSignUpMessage = (email: string, username: string, validationEmailToken: string) => {
  return {
    from: '"WingCo App" <wingspan.companion@gmail.com>',
    to: email,
    subject: i18n?.t('email:signUpEmailSubject'),
    html: i18n?.t('email:signUpEmail', {
      username,
      domain: process.env.NEXT_PUBLIC_WEB_URI,
      validationToken: validationEmailToken,
    }),
  };
};

export const getResetPasswordMessage = async (email: string, name: string, resetCode: string) => {
  const resetPasswordMessage = {
    from: '"WingCo App" <wingspan.companion@gmail.com>',
    to: email,
    subject: i18n?.t('email:resetPasswordEmailSubject'),
    html: i18n?.t('email:resetPasswordEmail', { name, passwordResetCode: resetCode }),
  };

  return resetPasswordMessage;
};

export const getChangeEmailMessage = async (userId: string, email: string, username: string) => {
  const validationEmailToken = uniqid();

  const setValidationEmailToken = await client.mutate({
    mutation: SET_VALIDATION_EMAIL_TOKEN,
    variables: { id: userId, validationEmailToken: validationEmailToken },
  });

  const validationToken = setValidationEmailToken.data.updatePlayer.validationEmailToken;

  const getChangeEmailMessage = {
    from: '"WingCo App" <wingspan.companion@gmail.com>',
    to: email,
    subject: i18n?.t('email:changeEmailSubject'),
    html: i18n?.t('email:changeEmail', {
      username,
      domain: process.env.NEXT_PUBLIC_WEB_URI,
      validationToken,
    }),
  };

  return getChangeEmailMessage;
};
