import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import React from 'react';
import PageLayout from '../components/PageLayout';

const SignIn: React.FC = () => {
  const { t } = useTranslation(['signIn']);

  return (
    <PageLayout title={t('title', { ns: 'signIn' })}>
      <Heading as="h1">{t('title', { ns: 'signIn' })}</Heading>
      <form>
        <FormControl>
          <FormLabel htmlFor="username">{t('usernameLabel', { ns: 'signIn' })}</FormLabel>
          <Input id="username" name="username" />
          <FormHelperText>{t('usernameHelperText', { ns: 'signIn' })}</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">{t('passwordLabel', { ns: 'signIn' })}</FormLabel>
          <Input id="password" name="password" type="password" />
          <FormHelperText>{t('passwordHelperText', { ns: 'signIn' })}</FormHelperText>
        </FormControl>
        <Link href="/forgot-password">{t('forgotPassword', { ns: 'signIn' })}</Link>
        <Checkbox name="rememberMe">{t('rememberMe', { ns: 'signIn' })}</Checkbox>
        <Button type="submit" name="signIn">
          {t('signInButtonLabel', { ns: 'signIn' })}
        </Button>
      </form>
      <Text>{t('notRegisteredYet', { ns: 'signIn' })}</Text>
      <Link href="/sign-up">{t('signUp', { ns: 'signIn' })}</Link>
    </PageLayout>
  );
};

export default SignIn;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['signIn', 'common'])),
  },
});
