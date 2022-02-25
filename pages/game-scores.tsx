import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import FormLayout from '../components/layout/FormLayout';
import PageLayout from '../components/layout/PageLayout';

const GameScores: React.FC = () => {
  const { t } = useTranslation('gameScores');
  return (
    <PageLayout title={t('title')}>
      <FormLayout></FormLayout>
    </PageLayout>
  );
};

export default GameScores;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['gameScores', 'common'])),
  },
});
