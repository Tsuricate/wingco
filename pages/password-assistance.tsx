import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import FormLayout from '../components/FormLayout';
import PageLayout from '../components/PageLayout';
import PasswordAssistStep1 from '../components/PasswordAssistStep1';
import PasswordAssistStep2 from '../components/PasswordAssistStep2';
import PasswordAssistStep3 from '../components/PasswordAssistStep3';

const PasswordAssistance = () => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  const [hasProvidedEmail, setHasProvidedEmail] = useState(false);
  const [hasCorrectResetCode, setHasCorrectResetCode] = useState(false);

  const handleSubmitStep1 = () => {
    setHasProvidedEmail(true);
  };

  const handleSubmitStep2 = () => {
    setHasCorrectResetCode(true);
  };

  return (
    <PageLayout title={t('title')}>
      <FormLayout>
        {!hasProvidedEmail && <PasswordAssistStep1 onSubmit={handleSubmitStep1} />}
        {hasProvidedEmail && !hasCorrectResetCode && (
          <PasswordAssistStep2 onSubmit={handleSubmitStep2} />
        )}
        {hasCorrectResetCode && <PasswordAssistStep3 />}
      </FormLayout>
    </PageLayout>
  );
};

export default PasswordAssistance;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['passwordAssistance', 'common'])),
  },
});
