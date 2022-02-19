import { Button, FormControl, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import React from 'react';
import FormLayout from '../components/FormLayout';
import PageLayout from '../components/PageLayout';

const SignUp: React.FC = () => {
  const { t } = useTranslation(['signUp']);

  return (
    <PageLayout title={t('title', { ns: 'signUp' })}>
      <FormLayout>
        <FormControl>
          <FormLabel htmlFor="username">{t('usernameLabel', { ns: 'signUp' })}</FormLabel>
          <Input id="username" name="username" />
          <FormHelperText>{t('usernameHelperText', { ns: 'signUp' })}</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">{t('emailLabel', { ns: 'signUp' })}</FormLabel>
          <Input id="email" name="email" type="email" />
          <FormHelperText>{t('emailHelperText', { ns: 'signUp' })}</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">{t('passwordLabel', { ns: 'signUp' })}</FormLabel>
          <Input id="password" name="password" type="password" />
          <FormHelperText>{t('passwordHelperText', { ns: 'signUp' })}</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="passwordValidation">
            {t('passwordLabelValidation', { ns: 'signUp' })}
          </FormLabel>
          <Input id="passwordValidation" name="passwordValidation" type="password" />
          <FormHelperText>{t('passwordValidationHelperText', { ns: 'signUp' })}</FormHelperText>
        </FormControl>
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
