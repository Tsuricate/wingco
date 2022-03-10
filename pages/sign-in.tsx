import { Checkbox, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Link from '../components/Link';
import FormControl from '../components/FormControl';
import FormLayout from '../components/Form';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/Button';

const SignIn: React.FC = () => {
  const { t } = useTranslation(['signIn', 'common']);

  const updateField = () => {
    console.log('Update');
  };

  const handleSubmit = () => {
    console.log('Button clicked');
  };

  return (
    <PageLayout title={t('signIn:title')}>
      <FormLayout>
        <FormControl
          id="username"
          name="username"
          label={t('common:usernameLabel')}
          helperText={t('common:usernameHelperText')}
          updateField={updateField}
        />
        <FormControl
          id="password"
          name="password"
          label={t('signIn:passwordLabel')}
          helperText={t('signIn:passwordHelperText')}
          updateField={updateField}
        />
        <Link href="/password-assistance">{t('signIn:forgotPassword')}</Link>
        <Checkbox name="rememberMe">{t('signIn:rememberMe')}</Checkbox>
        <Button type="submit" dataCy="signIn" variant="solid" onClick={handleSubmit}>
          {t('signIn:signInButtonLabel')}
        </Button>
        <Text>{t('signIn:notRegisteredYet')}</Text>
        <Link href="/sign-up">{t('signIn:signUp')}</Link>
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
