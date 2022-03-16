import { Alert, AlertIcon } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as yup from 'yup';
import Button from '../components/Button';
import Form from '../components/Form';
import FormControl from '../components/FormControl';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import { getErrorsMessages, validateFormData } from '../utils/formUtils';

const emailValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const VerifyEmail: React.FC = () => {
  const { t } = useTranslation(['signUp', 'common']);
  const router = useRouter();
  const { validatedEmail } = router.query;
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (email: string) => {
    setEmail(email);
  };

  const handleSubmit = () => {
    validateFormData(emailValidationSchema, { email })
      .then(() => {
        setFormErrors([]);
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
      });
  };

  return (
    <PageLayout title={t('signUp:emailValidation')}>
      {validatedEmail === 'false' && (
        <Alert status="error">
          <AlertIcon />
          {t('signUp:emailAddressInvalid')}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <FormControl
          id="email"
          label={t('common:emailLabel')}
          name="email"
          value={email}
          updateField={handleChange}
          helperText={t('common:emailHelperText')}
          errors={getErrorsMessages(formErrors, 'email')}
        ></FormControl>
        <Button type="submit">{t('common:send')}</Button>
        <Link href="/" asButton>
          {t('common:cancel')}
        </Link>
      </Form>
    </PageLayout>
  );
};

export default VerifyEmail;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['signUp', 'common'])),
  },
});