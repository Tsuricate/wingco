import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import FormControl from '../components/FormControl';
import FormLayout from '../components/Form';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import { submitSignUp, updateSignUpInfos } from '../redux/actions/signUp';
import { RootState } from '../redux/reducers';
import { getErrorsMessages, validateFormData } from '../utils/formUtils';
import { signUpSchema } from '../validations/signUpValidation';

const SignUp: React.FC = () => {
  const { t } = useTranslation(['signUp', 'common']);
  const [formErrors, setFormErrors] = useState([]);

  const newPlayerInfos = useSelector((state: RootState) => state.signUp);
  const { username, email, password, passwordValidation } = newPlayerInfos;
  const dispatch = useDispatch();

  const updateField = (value: string, name: string) => {
    dispatch(updateSignUpInfos(value, name));
  };

  const handleSubmit = () => {
    validateFormData(signUpSchema, newPlayerInfos)
      .then(() => {
        dispatch(submitSignUp());
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
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
          value={username}
          updateField={updateField}
          errors={getErrorsMessages(formErrors, 'username')}
        />
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
          label={t('signUp:passwordLabel')}
          helperText={t('signUp:passwordHelperText')}
          value={password}
          updateField={updateField}
          errors={getErrorsMessages(formErrors, 'password')}
        />
        <FormControl
          id="passwordValidation"
          name="passwordValidation"
          label={t('signUp:passwordLabelValidation')}
          helperText={t('signUp:passwordValidationHelperText')}
          value={passwordValidation}
          updateField={updateField}
          errors={getErrorsMessages(formErrors, 'passwordValidation')}
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
