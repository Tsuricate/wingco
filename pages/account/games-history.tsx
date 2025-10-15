import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import PageLayout from '../../components/layout/PageLayout';
import GamesHistoryPanel from '../../components/GamesHistoryPanel';
import { NextPageWithAuth } from '../../models/pageWithAuth';
import { GetServerSideProps } from 'next';
import { getGamesHistory } from '../../utils/api/gameUtils';
import { getUserInfosFromCookie } from '../../utils/api/auth';
import { GameHistory } from '../../models/game';
import { Stack, Text } from '@chakra-ui/react';
import Button from '../../components/Button';
import router from 'next/router';

interface GameHistoryProps {
  gamesHistory: Array<GameHistory>;
}

const GamesHistory: NextPageWithAuth<GameHistoryProps> = ({ gamesHistory }) => {
  const { t } = useTranslation(['gamesHistory', 'common']);

  return (
    <PageLayout title={t('gamesHistory:title')}>
      {gamesHistory.length ? (
        gamesHistory.map((game) => (
          <GamesHistoryPanel key={game.id} id={game.id} date={game.createdAt} players={game.results} />
        ))
      ) : (
        <Stack>
          <Text>{t('gamesHistory:noGamesYet')}</Text>
          <Button onClick={() => router.push('/new-game')}>{t('account:createGame')}</Button>
          <Button variant="outline" onClick={() => router.push('/account')}>
            {t('common:myAccount')}
          </Button>
        </Stack>
      )}
    </PageLayout>
  );
};

export default GamesHistory;

GamesHistory.requireAuth = true;

export const getServerSideProps: GetServerSideProps = async ({ locale, req }) => {
  try {
    const { id } = getUserInfosFromCookie(req.headers.cookie);
    const gamesHistory: Array<GameHistory> = await getGamesHistory(id);
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['gamesHistory', 'account', 'common'])),
        gamesHistory,
      },
    };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log(err);
    return {
      notFound: true,
    };
  }
};
