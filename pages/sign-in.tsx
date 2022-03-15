import { Alert, AlertIcon, Checkbox, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import Link from '../components/Link';
import FormControl from '../components/FormControl';
import Form from '../components/Form';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/Button';

const SignIn: React.FC = () => {
  const { t } = useTranslation(['signIn', 'signUp', 'common']);
  const router = useRouter();
  const { validatedEmail } = router.query;

  const updateField = () => {
    console.log('Update');
  };

  const handleSubmit = () => {
    console.log('Button clicked');
  };

  return (
    <PageLayout title={t('signIn:title')}>
      {validatedEmail && (
        <Alert status="success" my={5}>
          <AlertIcon />
          {t('signUp:emailAddressValid')}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit" dataCy="signIn" variant="solid">
          {t('signIn:signInButtonLabel')}
        </Button>
        <Text>{t('signIn:notRegisteredYet')}</Text>
        <Link href="/sign-up">{t('signIn:signUp')}</Link>
      </Form>
    </PageLayout>
  );
};

export default SignIn;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['signIn', 'signUp', 'common'])),
  },
});
