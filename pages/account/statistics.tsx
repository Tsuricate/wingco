import { List, ListItem, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GiCrossedSabres, GiTrophy } from 'react-icons/gi';
import PageLayout from '../../components/layout/PageLayout';
import StatisticsPanel from '../../components/StatisticsPanel';
import VersusPanel from '../../components/VersusPanel';
import { statisticsVersusData } from '../../mockData/statisticsVersusData';
import { NextPageWithAuth } from '../../models/pageWithAuth';
import { BestPersonalScores, Victories } from '../../models/statistics';
import { getUserInfosFromCookie } from '../../utils/api/auth';
import { getBestScoresByCategory, getPlayerStatistics } from '../../utils/api/playerUtils';
import { getPlayerVictories } from '../../utils/statistics';

interface StatisticsProps {
  playerVictories: Victories;
  bestScoresByCategory: Array<BestPersonalScores>;
}

const Statistics: NextPageWithAuth<StatisticsProps> = ({ playerVictories, bestScoresByCategory }) => {
  const { t } = useTranslation(['statistics', 'common']);

  return (
    <PageLayout title={t('statistics:title')}>
      <Stat>
        <StatLabel> {t('statistics:victories')}</StatLabel>
        <StatNumber>
          {playerVictories.victories} / {playerVictories.allGames}
        </StatNumber>
      </Stat>
      <StatisticsPanel
        title={t('statistics:bestScores')}
        description={t('statistics:bestScoresDescription')}
        icon={GiTrophy}
      >
        <List>
          {bestScoresByCategory.map((category) => (
            <ListItem key={category.category}>
              <Text>
                {category.value} {t(`common:categories.${category.category}`)}
              </Text>
            </ListItem>
          ))}
        </List>
      </StatisticsPanel>
      <StatisticsPanel
        title={t('statistics:versus')}
        description={t('statistics:versusDescription')}
        icon={GiCrossedSabres}
      >
        {statisticsVersusData.map((stat) => (
          <VersusPanel key={stat.title} {...stat} />
        ))}
      </StatisticsPanel>
    </PageLayout>
  );
};

export default Statistics;

Statistics.requireAuth = true;

export const getServerSideProps: GetServerSideProps = async ({ locale, req }) => {
  try {
    const { id } = getUserInfosFromCookie(req.headers.cookie);
    const { resultsAtGames, gameScores } = await getPlayerStatistics(id);
    const playerVictories: Victories = getPlayerVictories(resultsAtGames);
    const bestScoresByCategory: Array<BestPersonalScores> = getBestScoresByCategory(gameScores);

    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['statistics', 'common'])),
        playerVictories,
        bestScoresByCategory,
      },
    };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log(err);
    return {
      notFound: true,
    };
  }
};
