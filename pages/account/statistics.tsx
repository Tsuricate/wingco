import { List, Stack, Stat, StatLabel, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GiCrossedSabres, GiTrophy } from 'react-icons/gi';
import PageLayout from '../../components/layout/PageLayout';
import StatisticsPanel from '../../components/StatisticsPanel';
import VersusPanel from '../../components/VersusPanel';
import { NextPageWithAuth } from '../../models/pageWithAuth';
import {
  BestPersonalScores,
  ResultScoreWithPlayer,
  VersusResult,
  Victories,
} from '../../models/statistics';
import { getUserInfosFromCookie } from '../../utils/api/auth';
import { getBestScoresByCategory, getPlayerStatistics } from '../../utils/api/playerUtils';
import { getOtherPlayersScores, getPlayerVictories, getVersusResults } from '../../utils/statistics';
import Button from '../../components/Button';
import router from 'next/router';

interface StatisticsProps {
  playerVictories: Victories;
  bestScoresByCategory: Array<BestPersonalScores>;
  versusResults: Array<VersusResult>;
}

const Statistics: NextPageWithAuth<StatisticsProps> = ({
  playerVictories,
  bestScoresByCategory,
  versusResults,
}) => {
  const { t } = useTranslation(['statistics', 'common']);

  return (
    <PageLayout title={t('statistics:title')}>
      <Stack>
        <Stat.Root>
          <StatLabel>
            {' '}
            {t('statistics:victories', {
              victories: playerVictories.victories,
              allGames: playerVictories.allGames,
            })}
          </StatLabel>
        </Stat.Root>
        <StatisticsPanel
          title={t('statistics:bestScores')}
          description={t('statistics:bestScoresDescription')}
          icon={GiTrophy}
        >
          <List.Root>
            {bestScoresByCategory.map((category) => (
              <List.Item key={category.category}>
                <Text>
                  {category.value} {t(`common:categories.${category.category}`)}
                </Text>
              </List.Item>
            ))}
          </List.Root>
        </StatisticsPanel>
        <StatisticsPanel
          title={t('statistics:versus')}
          description={t('statistics:versusDescription')}
          icon={GiCrossedSabres}
        >
          {versusResults.map((result) => (
            <VersusPanel key={result.category} {...result} />
          ))}
        </StatisticsPanel>

        <Button variant="outline" onClick={() => router.push('/account')}>
          {t('common:myAccount')}
        </Button>
      </Stack>
    </PageLayout>
  );
};

export default Statistics;

Statistics.requireAuth = true;

export const getServerSideProps: GetServerSideProps = async ({ locale, req }) => {
  try {
    const { id } = getUserInfosFromCookie(req.headers.cookie);
    const { resultsAtGames, gameScores, games } = await getPlayerStatistics(id);
    const playerVictories: Victories = getPlayerVictories(resultsAtGames);
    const bestScoresByCategory: Array<BestPersonalScores> = getBestScoresByCategory(gameScores);
    const otherPlayersScores: Array<ResultScoreWithPlayer> = getOtherPlayersScores(games);
    const versusResults: Array<VersusResult> = getVersusResults(gameScores, otherPlayersScores);

    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['statistics', 'common'])),
        playerVictories,
        bestScoresByCategory,
        versusResults,
      },
    };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log(err);
    return {
      notFound: true,
    };
  }
};
