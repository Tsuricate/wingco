import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Heading, Stack, Text } from '@chakra-ui/react';
import Button from '../components/Button';
import Form from '../components/Form';
import FormControl from '../components/FormControl';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import Countdown from '../components/Countdown';
import SignUpModal from '../components/SignUpModal';
import { signUpForm } from '../data/form/signUpForm';
import { resendValidationToken, submitSignUp, updateSignUpInfos } from '../redux/actions/signUp';
import { RootState } from '../redux/reducers';
import { FormError, getErrorsMessages, validateFormData } from '../utils/formUtils';
import { signUpSchema } from '../validations';
import AlertMessage from '../components/AlertMessage';
import { PasswordStrengthMeter } from '../components/ui/password-input';
import { type Options, passwordStrength } from 'check-password-strength';

const SignUp: React.FC = () => {
  const { t } = useTranslation(['signUp', 'validations', 'common']);
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState<FormError[]>([]);
  const [isRetryDisabled, setIsRetryDisabled] = useState(false);
  const userInfos = useSelector((state: RootState) => state.signUp);

  const strengthOptions: Options<string> = [
    { id: 1, value: 'weak', minDiversity: 0, minLength: 0 },
    { id: 2, value: 'medium', minDiversity: 2, minLength: 6 },
    { id: 3, value: 'strong', minDiversity: 3, minLength: 8 },
    { id: 4, value: 'very-strong', minDiversity: 4, minLength: 10 },
  ];

  const strength = useMemo(
    (value = userInfos.password) => {
      if (!value) return 0;
      const result = passwordStrength(value, strengthOptions);
      return result.id;
    },
    [userInfos.password]
  );

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

  const handleClick = () => {
    setIsRetryDisabled(true);
    dispatch(resendValidationToken());
  };

  return (
    <PageLayout>
      <Stack width={{ base: '100%', lg: '40%' }} flex="1" gap={8} justifyContent={{ base: 'center' }}>
        <Stack gap={4}>
          <Heading size="2xl">{t('signUp:title')}</Heading>
          {alert && (
            <AlertMessage
              status={alert.status}
              title={alert.title}
              description={alert.description}
              addEl={
                alert.status === 'success' && (
                  <Stack direction="row" alignItems="center">
                    <Text>{t('signUp:emailNotReceived')}</Text>
                    <Button
                      type="button"
                      onClick={handleClick}
                      isDisabled={isRetryDisabled}
                      loadingText={t('common:resend')}
                    >
                      <Stack direction="row">
                        {t('common:resend')}
                        {isRetryDisabled && (
                          <Countdown duration={60} onFinish={() => setIsRetryDisabled(false)} />
                        )}
                      </Stack>
                    </Button>
                  </Stack>
                )
              }
            />
          )}
          <Text>{t('signUp:description')}</Text>
        </Stack>
        <Form onSubmit={handleSubmit}>
          <Stack gap={12}>
            <Stack gap={4} width="100%">
              {signUpForm.map((form) => (
                <FormControl
                  key={form.name}
                  id={form.name}
                  name={form.name}
                  label={t(`${form.label}`)}
                  helperText={t(`${form.helperText}`)}
                  value={userInfos[form.name]}
                  isDisabled={userInfos.showSignUpModal}
                  updateField={updateField}
                  errors={getErrorsMessages(formErrors, `${form.name}`)}
                  startElement={form.startElement}
                  extraElement={form.name === 'password' && <PasswordStrengthMeter value={strength} />}
                />
              ))}
            </Stack>
            <Button
              type="submit"
              dataCy="signUp"
              isLoading={userInfos['isLoading']}
              isDisabled={userInfos.showSignUpModal}
            >
              {t('signUp:signUpButtonLabel')}
            </Button>
            <Text alignSelf="center">
              {t('signUp:alreadyRegistered')}{' '}
              <Link href="/sign-in" linkVariant="underline">
                {t('signUp:signIn')}
              </Link>
            </Text>
          </Stack>
        </Form>
      </Stack>
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
