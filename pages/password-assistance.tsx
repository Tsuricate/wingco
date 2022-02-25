import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FormLayout from '../components/layout/FormLayout';
import PageLayout from '../components/layout/PageLayout';
import PasswordAssistStep1 from '../components/PasswordAssistStep1';
import PasswordAssistStep2 from '../components/PasswordAssistStep2';
import PasswordAssistStep3 from '../components/PasswordAssistStep3';

const PasswordAssistance = () => {
  const { t } = useTranslation(['passwordAssistance', 'common']);
  const { query } = useRouter();

  const [hasProvidedEmail, setHasProvidedEmail] = useState(false);
  const [hasCorrectResetCode, setHasCorrectResetCode] = useState(false);

  useEffect(() => {
    if (query.email) {
      setHasProvidedEmail(true);
    }
  }, [query.email]);

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
