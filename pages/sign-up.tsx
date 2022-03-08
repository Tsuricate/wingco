import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import FormControl from '../components/FormControl';
import FormLayout from '../components/layout/FormLayout';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import { UPDATE_SIGN_UP_INFOS } from '../redux/actions/signUp';
import { RootState } from '../redux/reducers';

const SignUp: React.FC = () => {
  const { t } = useTranslation(['signUp', 'common']);
  const { username, email, password, passwordValidation } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const updateField = (value: string, name: string) => {
    dispatch({ type: UPDATE_SIGN_UP_INFOS, value, name });
  };

  const handleSubmit = () => {
    console.log('playerInfos : ', name, email);
  };

  return (
    <PageLayout title={t('signUp:title')}>
      <FormLayout>
        <FormControl
          id="username"
          name="username"
          label={t('common:usernameLabel')}
          helperText={t('common:usernameHelperText')}
          value={username}
          updateField={updateField}
        />
        <FormControl
          id="email"
          name="email"
          label={t('common:emailLabel')}
          helperText={t('common:emailHelperText')}
          value={email}
          updateField={updateField}
        />
        <FormControl
          id="password"
          name="password"
          label={t('signUp:passwordLabel')}
          helperText={t('signUp:passwordHelperText')}
          value={password}
          updateField={updateField}
        />
        <FormControl
          id="passwordValidation"
          name="passwordValidation"
          label={t('signUp:passwordLabelValidation')}
          helperText={t('signUp:passwordValidationHelperText')}
          value={passwordValidation}
          updateField={updateField}
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
