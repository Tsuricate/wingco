import { Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import FormLayout from '../components/layout/FormLayout';
import PageLayout from '../components/layout/PageLayout';
import ScoresSection from '../components/ScoresSection';
import { categories } from '../mockData/bestScoreByCategory';
import players from '../mockData/fakePlayers';

const GameScores: React.FC = () => {
  const { t } = useTranslation(['gameScores', 'common']);
  return (
    <PageLayout title={t('title')}>
      <FormLayout>
        <Stack spacing={5}>
          {categories.map((category) => (
            <ScoresSection
              key={category}
              title={t(`categories.${category}`, { ns: 'common' })}
              players={players}
            />
          ))}
        </Stack>
      </FormLayout>
    </PageLayout>
  );
};

export default GameScores;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['gameScores', 'common'])),
  },
});
