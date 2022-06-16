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
import ScoreResults from '../../components/ScoreResults';
import { GameResults, NewPlayerRecord, ScoreByCategory } from '../../models/game';
import { getAllGameIds, getGameResults } from '../../utils/api/gameUtils';
import { getNewRecords, getPlayerInfosById, getPlayerScoresByCategory } from '../../utils/gameResults';

interface GameResultsProps {
  players: GameResults['players'];
  results: GameResults['results'];
  scoresByCategory: Array<ScoreByCategory>;
  newRecords: Array<NewPlayerRecord>;
}

const GameResults: NextPage<GameResultsProps> = ({ players, results, scoresByCategory, newRecords }) => {
  const { t } = useTranslation(['gameResults', 'common']);
  const [showDetails, setShowDetails] = useState(false);

  const handleSeeDetails = () => {
    setShowDetails(true);
  };

  if (!results || !scoresByCategory || !newRecords) return null;

  return (
    <PageLayout title={t('gameResults:title')}>
      <Stack spacing={5}>
        {results.map((result) => {
          const player = getPlayerInfosById(players, result.player.id);
          return (
            <Stack key={player.id} direction="row" align="center">
              <PlayerAvatar
                playerName={player.name}
                avatar={player.avatar.url}
                badge={result.badge}
                avatarSize="md"
              />
              <Text>
                : {result.totalScore} {t('common:points')}
              </Text>
            </Stack>
          );
        })}

        {newRecords &&
          newRecords.map((record) => (
            <NewRecord
              key={uniqid()}
              newRecord={record.newRecord}
              category={t(`common:categories.${record.category}`)}
              playerName={record.playerName}
              previousRecord={record.previousRecord}
            />
          ))}

        {!showDetails ? (
          <Button variant="outline" onClick={handleSeeDetails}>
            {t('gameResults:allDetails')}
          </Button>
        ) : (
          scoresByCategory.map((score) => {
            if (score.category !== 'totalScore') {
              return (
                <ScoreResults
                  key={score.category}
                  category={t(`common:categories.${score.category}`)}
                  playersScore={score.scores}
                />
              );
            }
          })
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

    const { players, results, scores, registeredPlayersScores }: GameResults = await getGameResults(
      gameId
    );

    const scoresByCategory = await getPlayerScoresByCategory(players, scores);
    const newRecords: Array<NewPlayerRecord> = getNewRecords(registeredPlayersScores);

    return {
      props: {
        ...(await serverSideTranslations(locale, ['gameResults', 'common'])),
        players,
        results,
        scoresByCategory,
        newRecords,
      },
    };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') console.log(err);
    return {
      notFound: true,
    };
  }
};
