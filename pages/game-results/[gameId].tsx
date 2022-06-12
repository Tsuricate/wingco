import { Stack, Text } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import uniqid from 'uniqid';
import Button from '../../components/Button';
import PageLayout from '../../components/layout/PageLayout';
import Link from '../../components/Link';
import NewRecord from '../../components/NewRecord';
import PlayerAvatar from '../../components/PlayerAvatar';
import ScoresSection from '../../components/ScoresSection';
import { newRecords, playerResultsByCategory } from '../../mockData/gameResults';
import { LeaderboardResult } from '../../models/game';
import { getAllGameIds, getGameResults } from '../../utils/game';

interface GameResultsProps {
  gameResults: Array<LeaderboardResult>;
}

const GameResults: NextPage<GameResultsProps> = ({ gameResults }) => {
  const { t } = useTranslation(['gameResults', 'common']);

  const [showDetails, setShowDetails] = useState(false);

  const handleSeeDetails = () => {
    setShowDetails(true);
  };

  if (!gameResults) return null;

  return (
    <PageLayout title={t('gameResults:title')}>
      <Stack spacing={5}>
        {gameResults.map((result) => (
          <Stack key={result.player.id} direction="row" align="center">
            <PlayerAvatar
              playerName={result.player.name}
              avatar={result.player.avatar.url}
              badge={result.badge}
              avatarSize="md"
            />
            <Text>
              : {result.totalScore} {t('common:points')}
            </Text>
          </Stack>
        ))}

        {newRecords.map((record) => (
          <NewRecord
            key={uniqid()}
            newRecord={record.newRecord}
            category={record.category}
            playerName={record.playerName}
            previousRecord={record.previousRecord}
          />
        ))}

        {!showDetails ? (
          <Button variant="outline" onClick={handleSeeDetails}>
            {t('gameResults:allDetails')}
          </Button>
        ) : (
          playerResultsByCategory.map((result) => (
            <ScoresSection
              key={result.category}
              category={t(`common:categories.${result.category}`)}
              players={result.players}
            />
          ))
        )}
        <Link href="/" asButton buttonVariant="solid">
          {t('common:close')}
        </Link>
      </Stack>
    </PageLayout>
  );
};

export default GameResults;

export const getStaticPaths = async () => {
  const paths = await getAllGameIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const gameId = params?.gameId;

    if (typeof gameId !== 'string') throw new Error('Game id is not a string');
    if (typeof locale !== 'string') throw new Error('Locale is not a string');

    const gameResults: Array<LeaderboardResult> = await getGameResults(gameId);

    return {
      props: {
        ...(await serverSideTranslations(locale, ['gameResults', 'common'])),
        gameResults,
      },
    };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log(err);
    return {
      notFound: true,
    };
  }
};
