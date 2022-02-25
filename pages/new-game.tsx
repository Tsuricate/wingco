import { FormControl, FormLabel, Stack, Switch, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import Button from '../components/Button';
import InvitePlayerButton from '../components/InvitePlayerButton';
import FormLayout from '../components/layout/FormLayout';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import NewGamePlayer from '../components/NewGamePlayer';

const NewGame: React.FC = () => {
  const { t } = useTranslation('newGame');
  const [players, setPlayers] = useState([{}]);
  const gameId = '#156D5E8';

  const handleAddPlayer = () => {
    if (players.length < 5) {
      setPlayers([...players, {}]);
    }
  };

  return (
    <PageLayout title={t('title')}>
      <Text>ID {gameId}</Text>
      <FormLayout>
        <Stack>
          {players.map((player, index) => (
            <NewGamePlayer key={index} playerNumber={index + 1} />
          ))}
        </Stack>
        <Button onClick={handleAddPlayer}>{t('addPlayer')}</Button>
        <InvitePlayerButton />
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="useNectar">{t('useNectar')}</FormLabel>
          <Switch id="useNectar" />
        </FormControl>
        <Text>{t('estimatedTime', { duration: 45 })}</Text>
        <Link href={`/game-scores?gameId=${gameId}`} asButton buttonVariant="solid">
          {t('startGame')}
        </Link>
      </FormLayout>
    </PageLayout>
  );
};

export default NewGame;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['newGame', 'common'])),
  },
});
