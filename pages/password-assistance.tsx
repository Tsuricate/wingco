import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Form from '../components/Form';
import PageLayout from '../components/layout/PageLayout';
import PasswordAssistStep1 from '../components/PasswordAssistStep1';
import PasswordAssistStep2 from '../components/PasswordAssistStep2';
import PasswordAssistStep3 from '../components/PasswordAssistStep3';
import {
  changeUserPassword,
  sendResetPasswordEmail,
  updatePasswordAssistanceInfos,
  verifyPasswordResetCode,
} from '../redux/actions/passwordAssistance';
import { RootState } from '../redux/reducers';
import { getErrorsMessages, validateFormData } from '../utils/formUtils';

const emailValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const resetCodeValidationSchema = yup.object().shape({
  resetCode: yup.string().length(8).required(),
});

export const passwordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .max(20)
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special case character !'
    )
    .required('Password must be defined'),
  passwordValidation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
});

const PasswordAssistance = () => {
  const { t } = useTranslation(['passwordAssistance', 'common']);
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { email, resetCode, hasCorrectResetCode, password, passwordValidation } = useSelector(
    (state: RootState) => state.passwordAssistance
  );
  const [formErrors, setFormErrors] = useState([]);
  const [hasProvidedEmail, setHasProvidedEmail] = useState(false);

  const isStep1 = !hasProvidedEmail;
  const isStep2 = hasProvidedEmail && !hasCorrectResetCode;
  const isStep3 = hasProvidedEmail && hasCorrectResetCode;

  useEffect(() => {
    if (query.email) {
      setHasProvidedEmail(true);
    }
  }, [query.email]);

  const updateField = (value: string, name: string) => {
    dispatch(updatePasswordAssistanceInfos(value, name));
  };

  const handleSubmit = () => {
    if (isStep1) {
      validateFormData(emailValidationSchema, { email })
        .then(async () => {
          setFormErrors([]);
          dispatch(sendResetPasswordEmail());
          setHasProvidedEmail(true);
        })
        .catch((errorsArray) => {
          setFormErrors(errorsArray);
        });
    }

    if (isStep2) {
      validateFormData(resetCodeValidationSchema, { resetCode })
        .then(async () => {
          setFormErrors([]);
          dispatch(verifyPasswordResetCode());
        })
        .catch((errorsArray) => {
          setFormErrors(errorsArray);
        });
    }

    if (isStep3) {
      validateFormData(passwordValidationSchema, { password, passwordValidation })
        .then(async () => {
          setFormErrors([]);
          dispatch(changeUserPassword());
        })
        .catch((errorsArray) => {
          setFormErrors(errorsArray);
        });
    }
  };

  return (
    <PageLayout title={t('passwordAssistance:title')}>
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
      </Form>
    </PageLayout>
  );
};

export default PasswordAssistance;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['passwordAssistance', 'common'])),
  },
});
