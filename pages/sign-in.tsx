import { Button, Checkbox, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Link from '../components/Link';
import FormControl from '../components/FormControl';
import FormLayout from '../components/FormLayout';
import PageLayout from '../components/PageLayout';

const SignIn: React.FC = () => {
  const { t } = useTranslation(['signIn']);

  return (
    <PageLayout title={t('title', { ns: 'signIn' })}>
      <FormLayout>
        <FormControl
          id="username"
          name="username"
          label={t('usernameLabel', { ns: 'signIn' })}
          helperText={t('usernameHelperText', { ns: 'signIn' })}
        />
        <FormControl
          id="password"
          name="password"
          label={t('passwordLabel', { ns: 'signIn' })}
          helperText={t('passwordHelperText', { ns: 'signIn' })}
        />
        <Link href="/password-assistance">{t('forgotPassword', { ns: 'signIn' })}</Link>
        <Checkbox name="rememberMe">{t('rememberMe', { ns: 'signIn' })}</Checkbox>
        <Button type="submit" name="signIn">
          {t('signInButtonLabel', { ns: 'signIn' })}
        </Button>
        <Text>{t('notRegisteredYet', { ns: 'signIn' })}</Text>
        <Link href="/sign-up">{t('signUp', { ns: 'signIn' })}</Link>
      </FormLayout>
    </PageLayout>
  );
};

export default SignIn;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['signIn', 'common'])),
  },
});
