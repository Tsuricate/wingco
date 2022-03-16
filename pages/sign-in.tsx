import { Alert, AlertIcon, Checkbox, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '../components/Link';
import FormControl from '../components/FormControl';
import Form from '../components/Form';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/Button';
import { updateRememberMe, updateSignInInfos } from '../redux/actions/signIn';
import { RootState } from '../redux/reducers';
import { getErrorsMessages, validateFormData } from '../utils/formUtils';

const emailValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const SignIn: React.FC = () => {
  const { t } = useTranslation(['signIn', 'signUp', 'common']);
  const { email, password, rememberMe } = useSelector((state: RootState) => state.signIn);
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
      .then(() => {
        setFormErrors([]);
        console.log('Submit !');
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
      });
  };

  return (
    <PageLayout title={t('signIn:title')}>
      {validatedEmail === 'true' && (
        <Alert status="success" my={5}>
          <AlertIcon />
          {t('signUp:emailAddressValid')}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <FormControl
          id="email"
          label={t('common:emailLabel')}
          name="email"
          value={email}
          updateField={updateField}
          helperText={t('common:emailHelperText')}
          errors={getErrorsMessages(formErrors, 'email')}
        />
        <FormControl
          id="password"
          name="password"
          value={password}
          label={t('signIn:passwordLabel')}
          helperText={t('signIn:passwordHelperText')}
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
