import { List, ListItem, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GiCrossedSabres, GiTrophy } from 'react-icons/gi';
import PageLayout from '../../components/layout/PageLayout';
import StatisticsPanel from '../../components/StatisticsPanel';
import VersusPanel from '../../components/VersusPanel';
import { bestScoreByCategory } from '../../mockData/bestScoreByCategory';
import { statisticsVersusData } from '../../mockData/statisticsVersusData';
import { NextPageWithAuth } from '../../models/pageWithAuth';
import { Statistics } from '../../models/statistics';
import { getUserInfosFromCookie } from '../../utils/api/auth';
import { getPlayerStatistics } from '../../utils/api/playerUtils';
import { getPlayerVictories } from '../../utils/statistics';

interface StatisticsProps {
  playerStatistics: Statistics;
}

const Statistics: NextPageWithAuth<StatisticsProps> = ({ playerStatistics }) => {
  const { t } = useTranslation(['statistics', 'common']);

  return (
    <PageLayout title={t('statistics:title')}>
      <Stat>
        <StatLabel> {t('statistics:victories')}</StatLabel>
        <StatNumber>
          {playerStatistics.victories} / {playerStatistics.allGames}
        </StatNumber>
      </Stat>
      <StatisticsPanel
        title={t('statistics:bestScores')}
        description={t('statistics:bestScoresDescription')}
        icon={GiTrophy}
      >
        <List>
          {bestScoreByCategory.map((category) => (
            <ListItem key={category.name}>
              <Text>
                {category.score} {t(`common:categories.${category.name}`)}
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
    const { resultsAtGames } = await getPlayerStatistics(id);
    const playerStatistics: Statistics = await getPlayerVictories(resultsAtGames);

    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['statistics', 'common'])),
        playerStatistics,
      },
    };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log(err);
    return {
      notFound: true,
    };
  }
};
