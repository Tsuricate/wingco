import uniqid from 'uniqid';
import { FormControl, FormLabel, Stack, Switch, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import Button from '../components/Button';
import InvitePlayerButton from '../components/InvitePlayerButton';
import Form from '../components/Form';
import PageLayout from '../components/layout/PageLayout';
import NewGamePlayer from '../components/NewGamePlayer';

const NewGame: React.FC = () => {
  const { t } = useTranslation('newGame');
  const [players, setPlayers] = useState([{ id: uniqid() }]);
  const gameId = '#156D5E8';

  const handleAddPlayer = () => {
    if (players.length < 5) {
      setPlayers([...players, { id: uniqid() }]);
    }
  };

  const handleDeletePlayer = (playerId: string) => {
    const newPlayersList = players.filter((player) => player.id !== playerId);
    setPlayers([...newPlayersList]);
  };

  const handleSubmit = () => {
    console.log('Submit !');
  };

  return (
    <PageLayout title={t('newGame:title')}>
      <Text>ID {gameId}</Text>
      <Form onSubmit={handleSubmit}>
        <Stack>
          {players.map((player, index) => (
            <NewGamePlayer
              key={player.id}
              playerNumber={index + 1}
              onDeletePlayer={() => handleDeletePlayer(player.id)}
            />
          ))}
        </Stack>
        <Button onClick={handleAddPlayer}>{t('newGame:addPlayer')}</Button>
        <InvitePlayerButton />
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="useNectar">{t('newGame:useNectar')}</FormLabel>
          <Switch id="useNectar" />
        </FormControl>
        <Text>{t('newGame:estimatedTime', { duration: 45 })}</Text>
        <Button type="submit">{t('newGame:startGame')}</Button>
      </Form>
    </PageLayout>
  );
};

export default NewGame;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['newGame', 'common'])),
  },
});
