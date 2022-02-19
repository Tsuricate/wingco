import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import FormLayout from '../components/FormLayout';
import PageLayout from '../components/PageLayout';
import PasswordAssistStep1 from '../components/PasswordAssistStep1';

const PasswordAssistance = () => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  return (
    <PageLayout title={t('title')}>
      <FormLayout>
        <PasswordAssistStep1 />
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
