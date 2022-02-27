import { Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import FormLayout from '../components/layout/FormLayout';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import ScoresSection from '../components/ScoresSection';
import { categories } from '../mockData/bestScoreByCategory';
import players from '../mockData/fakePlayers';

const GameScores: React.FC = () => {
  const { t } = useTranslation(['gameScores', 'common']);
  const gameId = '#156D5E8';
  return (
    <PageLayout title={t('gameScores:title')}>
      <FormLayout>
        <Stack spacing={5}>
          {categories.map((category) => (
            <ScoresSection
              key={category}
              title={t(`common:categories.${category}`)}
              players={players}
            />
          ))}
        </Stack>
        <Link asButton href={`/game-results?gameId=${gameId}`} buttonVariant="solid">
          {t('gameScores:computeScores')}
        </Link>
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
