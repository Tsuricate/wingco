import { List, ListItem, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import StatisticsPanel from '../../components/StatisticsPanel';
import VersusPanel from '../../components/VersusPanel';
import { statisticsVersusData } from '../../mockData/statisticsVersusData';
import { GiCrossedSabres, GiTrophy } from 'react-icons/gi';
import { bestScoreByCategory } from '../../mockData/bestScoreByCategory';

const Statistics: React.FC = () => {
  const { t } = useTranslation(['statistics', 'common']);

  return (
    <PageLayout title={t('title')}>
      <Stat>
        <StatLabel> {t('victories')}</StatLabel>
        <StatNumber>45 / 156</StatNumber>
      </Stat>
      <StatisticsPanel
        title={t('bestScores')}
        description={t('bestScoresDescription')}
        icon={GiTrophy}
      >
        <List>
          {bestScoreByCategory.map((category) => (
            <ListItem key={category.name}>
              <Text>
                {category.score} {t(`categories.${category.name}`, { ns: 'common' })}
              </Text>
            </ListItem>
          ))}
        </List>
      </StatisticsPanel>
      <StatisticsPanel
        title={t('versus')}
        description={t('versusDescription')}
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

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['statistics', 'common'])),
  },
});
