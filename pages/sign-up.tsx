import { Button, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import React from 'react';
import FormControl from '../components/FormControl';
import FormLayout from '../components/FormLayout';
import PageLayout from '../components/PageLayout';

const SignUp: React.FC = () => {
  const { t } = useTranslation(['signUp']);

  return (
    <PageLayout title={t('title', { ns: 'signUp' })}>
      <FormLayout>
        <FormControl
          id="username"
          name="username"
          label={t('usernameLabel', { ns: 'signUp' })}
          helperText={t('usernameHelperText', { ns: 'signUp' })}
        />
        <FormControl
          id="email"
          name="email"
          label={t('emailLabel', { ns: 'signUp' })}
          helperText={t('emailHelperText', { ns: 'signUp' })}
        />
        <FormControl
          id="password"
          name="password"
          label={t('passwordLabel', { ns: 'signUp' })}
          helperText={t('passwordHelperText', { ns: 'signUp' })}
        />
        <FormControl
          id="passwordValidation"
          name="passwordValidation"
          label={t('passwordLabelValidation', { ns: 'signUp' })}
          helperText={t('passwordValidationHelperText', { ns: 'signUp' })}
        />
        <Button type="submit" name="signUp">
          {t('signUpButtonLabel', { ns: 'signUp' })}
        </Button>
        <Text>{t('alreadyRegistered', { ns: 'signUp' })}</Text>
        <Link href="/sign-in">{t('signIn', { ns: 'signUp' })}</Link>
      </FormLayout>
    </PageLayout>
  );
};

export default SignUp;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['signUp', 'common'])),
  },
});
