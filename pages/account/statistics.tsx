import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import PageLayout from '../../components/layout/PageLayout';

const Statistics: React.FC = () => {
  const { t } = useTranslation('statistics');

  return (
    <PageLayout title={t('title')}>
      <Stat>
        <StatLabel> {t('victories')}</StatLabel>
        <StatNumber>45 / 156</StatNumber>
      </Stat>
    </PageLayout>
  );
};

export default Statistics;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['statistics', 'common'])),
  },
});
