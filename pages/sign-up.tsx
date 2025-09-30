import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import Form from '../components/Form';
import FormControl from '../components/FormControl';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import SignUpModal from '../components/SignUpModal';
import { signUpForm } from '../data/form/signUpForm';
import { submitSignUp, updateSignUpInfos } from '../redux/actions/signUp';
import { RootState } from '../redux/reducers';
import { FormError, getErrorsMessages, validateFormData } from '../utils/formUtils';
import { signUpSchema } from '../validations';
import AlertMessage from '../components/AlertMessage';

const SignUp: React.FC = () => {
  const { t } = useTranslation(['signUp', 'validations', 'common']);
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState<FormError[]>([]);
  const userInfos = useSelector((state: RootState) => state.signUp);

  const updateField = (value: string, name: string) => {
    dispatch(updateSignUpInfos(value, name));
  };

  const handleSubmit = () => {
    validateFormData(signUpSchema, userInfos)
      .then(() => {
        setFormErrors([]);
        dispatch(submitSignUp());
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
      });
  };

  let alert: { status: 'success' | 'error'; title: string; description: string } | null = null;

  switch (true) {
    case userInfos.showSignUpModal:
      alert = {
        status: 'success',
        title: t('signUp:successModal:title'),
        description: t('signUp:successModal.children'),
      };
      break;

    case userInfos.errorWhileCreatingUser:
      alert = {
        status: 'error',
        title: t('signUp:errorCreatingUserModal:title'),
        description: t('signUp:errorCreatingUserModal.children'),
      };
      break;

    case userInfos.errorWhileSendingEmail:
      alert = {
        status: 'error',
        title: t('signUp:errorSendingEmailModal:title'),
        description: t('signUp:errorSendingEmailModal.children'),
      };
      break;
  }
  useEffect(() => {
    if (userInfos.errorUniqueUsername) {
      setFormErrors([
        ...formErrors.filter((err) => err.name !== 'username'),
        { name: 'username', message: t('signUp:errorUniqueUsername') },
      ]);
    } else {
      setFormErrors(formErrors.filter((err) => err.name !== 'username'));
    }
  }, [userInfos.errorUniqueUsername]);

  useEffect(() => {
    if (userInfos.errorUniqueUsername) {
      dispatch({ type: 'ERROR_UNIQUE_USERNAME', value: false });
    }
  }, [userInfos.username]);

  return (
    <PageLayout title={t('signUp:title')}>
      {alert && (
        <AlertMessage status={alert.status} title={alert.title} description={alert.description} />
      )}
      <Form onSubmit={handleSubmit}>
        {signUpForm.map((form) => (
          <FormControl
            key={form.name}
            id={form.name}
            name={form.name}
            label={t(`${form.label}`)}
            helperText={t(`${form.helperText}`)}
            value={userInfos[form.name]}
            updateField={updateField}
            errors={getErrorsMessages(formErrors, `${form.name}`)}
          />
        ))}
        <Button type="submit" dataCy="signUp" isLoading={userInfos['isLoading']}>
          {t('signUp:signUpButtonLabel')}
        </Button>
        <Text>{t('signUp:alreadyRegistered')}</Text>
        <Link href="/sign-in">{t('signUp:signIn')}</Link>
      </Form>
      <SignUpModal />
    </PageLayout>
  );
};

export default SignUp;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['signUp', 'validations', 'email', 'common'])),
    },
  };
};
