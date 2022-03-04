import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Link from '../components/Link';
import FormControl from '../components/FormControl';
import FormLayout from '../components/layout/FormLayout';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/Button';
import axios from 'axios';
import { NewPlayer } from '../models/players';

const SignUp: React.FC = () => {
  const { t } = useTranslation(['signUp', 'common']);

  const newPlayer: NewPlayer = {
    name: 'Steven Universe',
    email: 'stevenu@gmail.com',
    password: 'lion',
  };

  const handleSubmit = () => {
    axios.post('/api/sign-up', newPlayer).then((response) => {
      console.log('response : ', response);
    });
  };

  return (
    <PageLayout title={t('signUp:title')}>
      <FormLayout>
        <FormControl
          id="username"
          name="username"
          label={t('common:usernameLabel')}
          helperText={t('common:usernameHelperText')}
        />
        <FormControl
          id="email"
          name="email"
          label={t('common:emailLabel')}
          helperText={t('common:emailHelperText')}
        />
        <FormControl
          id="password"
          name="password"
          label={t('signUp:passwordLabel')}
          helperText={t('signUp:passwordHelperText')}
        />
        <FormControl
          id="passwordValidation"
          name="passwordValidation"
          label={t('signUp:passwordLabelValidation')}
          helperText={t('signUp:passwordValidationHelperText')}
        />
        <Button type="submit" dataCy="signUp" onClick={handleSubmit}>
          {t('signUp:signUpButtonLabel')}
        </Button>
        <Text>{t('signUp:alreadyRegistered')}</Text>
        <Link href="/sign-in">{t('signUp:signIn')}</Link>
      </FormLayout>
    </PageLayout>
  );
};

export default SignUp;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['signUp', 'common'])),
    },
  };
};
