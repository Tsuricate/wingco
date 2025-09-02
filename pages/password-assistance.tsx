import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/Form';
import FormActions from '../components/FormActions';
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
  const isStep2 = hasProvidedEmail && !hasCorrectResetCode;
  const isStep3 = hasProvidedEmail && hasCorrectResetCode;

  const updateField = (value: string, name: string) => {
    dispatch(updatePasswordAssistanceInfos(value, name));
  };

  const handleSubmit = () => {
    const steps: Step<any>[] = [
      { schema: emailValidationSchema, data: { email }, action: sendResetPasswordEmail },
      { schema: resetCodeValidationSchema, data: { resetCode }, action: verifyPasswordResetCode },
      {
        schema: passwordValidationSchema,
        data: { password, passwordValidation },
        action: changeUserPassword,
      },
    ];

    const step = isStep1 ? steps[0] : isStep2 ? steps[1] : steps[2];

    validateFormData(step.schema, step.data)
      .then(() => {
        setFormErrors([]);
        dispatch(step.action());
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
      });
  };

  const stepNumber = isStep1 ? 1 : isStep2 ? 2 : 3;

  return (
    <PageLayout title={t('passwordAssistance:title')}>
      <Form onSubmit={handleSubmit}>
        <Text>Step {stepNumber}/3</Text>
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
        {!hasChangedPassword && (
          <FormActions
            cancelUrl="/sign-in"
            isLoading={isLoading}
            loadingText={t('common:submitting')}
            onClick={() => dispatch(resetPasswordAssistanceInfos())}
          />
        )}
      </Form>
    </PageLayout>
  );
};

export default PasswordAssistance;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['passwordAssistance', 'validations', 'email', 'common'])),
  },
});
