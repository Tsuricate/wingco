import { Checkbox, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import AlertMessage from '../components/AlertMessage';
import Button from '../components/Button';
import Form from '../components/Form';
import FormControl from '../components/FormControl';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import { saveUser } from '../redux/actions/auth';
import { updateRememberMe, updateSignInInfos } from '../redux/actions/signIn';
import { RootState } from '../redux/reducers';
import { signIn } from '../utils/authUtils';
import { getErrorsMessages, validateFormData } from '../utils/formUtils';

const emailValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const SignIn: React.FC = () => {
  const { t } = useTranslation(['signIn', 'signUp', 'common']);
  const { email, password, rememberMe } = useSelector((state: RootState) => state.signIn);
  const [errorSignIn, setErrorSignIn] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { validatedEmail } = router.query;

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
        const player = await signIn({ email, password, setErrorSignIn });
        if (player) {
          dispatch(saveUser(player, rememberMe));
          router.push('/account');
        }
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
        <Link href="/password-assistance">{t('signIn:forgotPassword')}</Link>
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
    ...(await serverSideTranslations(locale, ['signIn', 'signUp', 'common'])),
  },
});
