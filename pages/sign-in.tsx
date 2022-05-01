import { Checkbox, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import Button from '../components/Button';
import Form from '../components/Form';
import FormControl from '../components/FormControl';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import { resetPasswordAssistanceInfos } from '../redux/actions/passwordAssistance';
import { submitSignIn, updateRememberMe, updateSignInInfos } from '../redux/actions/signIn';
import { RootState } from '../redux/reducers';
import { getErrorsMessages, validateFormData } from '../utils/formUtils';
import { getRedirection, removeRedirection } from '../utils/redirection';
import { emailValidationSchema } from '../validations';

const SignIn: React.FC = () => {
  const { t } = useTranslation(['signIn', 'signUp', 'validations', 'common']);
  const { email, password, rememberMe, errorSignIn } = useSelector((state: RootState) => state.signIn);
  const { id } = useSelector((state: RootState) => state.auth);

  const [formErrors, setFormErrors] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { validatedEmail, unauthorized } = router.query;

  useEffect(() => {
    const redirect = getRedirection('sign_in_redirect');
    if (id) {
      if (redirect) {
        router.push(redirect);
        removeRedirection('sign_in_redirect');
      } else {
        router.push('/account');
      }
    }
  });

  const handleClick = () => {
    dispatch(resetPasswordAssistanceInfos());
  };

  const updateField = (value: string, name: string) => {
    dispatch(updateSignInInfos(value, name));
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateRememberMe(event.target.checked));
  };

  const handleSubmit = () => {
    validateFormData(emailValidationSchema, { email })
      .then(async () => {
        setFormErrors([]);
        dispatch(submitSignIn());
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
      });
  };

  return (
    <PageLayout title={t('signIn:title')}>
      {validatedEmail === 'true' && (
        <AlertMessage status="success">{t('signUp:emailAddressValid')}</AlertMessage>
      )}
      {errorSignIn && <AlertMessage status="error">{t('signIn:errorSignIn')}</AlertMessage>}
      {unauthorized && <AlertMessage status="error">{t('signIn:errorUnauthorized')}</AlertMessage>}

      <Form onSubmit={handleSubmit}>
        <FormControl
          id="email"
          name="email"
          label={t('common:emailLabel')}
          helperText={t('common:emailHelperText')}
          value={email}
          updateField={updateField}
          errors={getErrorsMessages(formErrors, 'email')}
        />
        <FormControl
          id="password"
          name="password"
          label={t('signIn:passwordLabel')}
          helperText={t('signIn:passwordHelperText')}
          value={password}
          updateField={updateField}
        />
        <Link href="/password-assistance" onClick={handleClick}>
          {t('signIn:forgotPassword')}
        </Link>
        <Checkbox name="rememberMe" isChecked={rememberMe} onChange={handleCheckbox}>
          {t('signIn:rememberMe')}
        </Checkbox>
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
    ...(await serverSideTranslations(locale, ['signIn', 'signUp', 'validations', 'common'])),
  },
});
