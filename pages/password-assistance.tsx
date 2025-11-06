import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Heading, Stack } from '@chakra-ui/react';
import Form from '../components/Form';
import PageLayout from '../components/layout/PageLayout';
import PasswordAssistStep1 from '../components/PasswordAssistStep1';
import PasswordAssistStep2 from '../components/PasswordAssistStep2';
import PasswordAssistStep3 from '../components/PasswordAssistStep3';
import {
  changeUserPassword,
  resetPasswordAssistanceInfos,
  sendResetPasswordEmail,
  updatePasswordAssistanceInfos,
  verifyPasswordResetCode,
} from '../redux/actions/passwordAssistance';
import { RootState } from '../redux/reducers';
import { getErrorsMessages, validateFormData } from '../utils/formUtils';
import {
  emailValidationSchema,
  passwordValidationSchema,
  resetCodeValidationSchema,
  Step,
} from '../validations';
import FormActions from '../components/FormActions';
import Stepper from '../components/Stepper';

const PasswordAssistance = () => {
  const { t } = useTranslation(['passwordAssistance', 'validations', 'common']);
  const dispatch = useDispatch();
  const {
    email,
    isLoading,
    resetCode,
    hasProvidedEmail,
    hasCorrectResetCode,
    password,
    passwordValidation,
    hasChangedPassword,
  } = useSelector((state: RootState) => state.passwordAssistance);
  const [formErrors, setFormErrors] = useState([]);

  const isStep1 = !hasProvidedEmail;
  const isStep2 = hasProvidedEmail && !hasCorrectResetCode && !isLoading;
  const isStep3 = hasProvidedEmail && hasCorrectResetCode && !isLoading;

  const updateField = (value: string, name: string) => {
    dispatch(updatePasswordAssistanceInfos(value, name));
  };

  const steps: Step<any>[] = [
    {
      title: t('passwordAssistance:step1'),
      schema: emailValidationSchema,
      data: { email },
      action: sendResetPasswordEmail,
    },
    {
      title: t('passwordAssistance:step2'),
      schema: resetCodeValidationSchema,
      data: { resetCode },
      action: verifyPasswordResetCode,
    },
    {
      title: t('passwordAssistance:step3'),
      schema: passwordValidationSchema,
      data: { password, passwordValidation },
      action: changeUserPassword,
    },
  ];

  const step = isStep1 ? steps[0] : isStep2 ? steps[1] : steps[2];
  const stepNumber = isStep1 ? 0 : isStep2 ? 1 : 2;

  const handleSubmit = () => {
    validateFormData(step.schema, step.data)
      .then(() => {
        setFormErrors([]);
        dispatch(step.action());
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
      });
  };

  return (
    <PageLayout>
      <Stack
        flex="1"
        width={{ base: '100%', lg: '50%' }}
        gap={4}
        justifyContent={{ base: 'end', md: 'center' }}
        direction="column"
        alignItems={{ base: 'start', md: 'center' }}
      >
        <Stack width={{ base: '100%', mdOnly: '70%' }}>
          <Heading alignSelf="flex-start">{t('passwordAssistance:title')}</Heading>
          <Form onSubmit={handleSubmit}>
            {isStep1 && (
              <PasswordAssistStep1
                updateField={updateField}
                value={email}
                errors={getErrorsMessages(formErrors, 'email')}
              />
            )}
            {isStep2 && (
              <PasswordAssistStep2
                value={resetCode}
                updateField={updateField}
                email={email}
                errors={getErrorsMessages(formErrors, 'resetCode')}
              />
            )}
            {isStep3 && (
              <PasswordAssistStep3
                updateField={updateField}
                password={password}
                passwordValidation={passwordValidation}
                errors={formErrors}
              />
            )}

            <Stack gap={4} mt={4}>
              {!hasChangedPassword && (
                <FormActions
                  cancelUrl="/sign-in"
                  isLoading={isLoading}
                  loadingText={t('common:submitting')}
                  onClick={() => dispatch(resetPasswordAssistanceInfos())}
                />
              )}

              <Stepper steps={steps} currentStep={stepNumber} completedSteps={hasChangedPassword} />
            </Stack>
          </Form>
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default PasswordAssistance;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['passwordAssistance', 'validations', 'email', 'common'])),
  },
});
