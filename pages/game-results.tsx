import { Stack, Text } from '@chakra-ui/react';
import uniqid from 'uniqid';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import NewRecord from '../components/NewRecord';
import PlayerAvatar from '../components/PlayerAvatar';
import { gameResults, newRecords, playerResultsByCategory } from '../mockData/gameResults';
import Button from '../components/Button';
import ScoresSection from '../components/ScoresSection';
import Link from '../components/Link';

const GameResults: React.FC = () => {
  const { t } = useTranslation(['gameResults', 'common']);
  const [showDetails, setShowDetails] = useState(false);

  const handleSeeDetails = () => {
    setShowDetails(true);
  };

  return (
    <PageLayout title={t('gameResults:title')}>
      <Stack spacing={5}>
        {gameResults.map((player) => (
          <Stack key={player.id} direction="row" align="center">
            <PlayerAvatar playerName={player.name} badge={player.badge} avatarSize="md" />
            <Text>
              : {player.score} {t('common:points')}
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
              title={t(`common:categories.${result.category}`)}
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

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['gameResults', 'common'])),
  },
});
