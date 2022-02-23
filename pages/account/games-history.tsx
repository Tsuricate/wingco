import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import PageLayout from '../../components/layout/PageLayout';
import GamesHistoryPanel from '../../components/GamesHistoryPanel';
import gamesHistoryData from '../../mockData/gamesHistoryData';

const GamesHistory: React.FC = () => {
  const { t } = useTranslation(['gamesHistory', 'common']);

  return (
    <PageLayout title={t('title')}>
      {gamesHistoryData.map((game) => (
        <GamesHistoryPanel key={game.id} {...game} />
      ))}
    </PageLayout>
  );
};

export default GamesHistory;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['gamesHistory', 'common'])),
  },
});
