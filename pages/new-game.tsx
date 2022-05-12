import { FormControl, FormLabel, Stack, Switch, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import Form from '../components/Form';
import InvitePlayerButton from '../components/InvitePlayerButton';
import PageLayout from '../components/layout/PageLayout';
import NewGamePlayer from '../components/NewGamePlayer';
import { saveFirstPlayer } from '../redux/actions/newGame';
import { RootState } from '../redux/reducers';

const NewGame: React.FC = () => {
  const { t } = useTranslation('newGame');
  const dispatch = useDispatch();
  const { isLogged, id, name, avatar } = useSelector((state: RootState) => state.auth);
  const { players } = useSelector((state: RootState) => state.game);
  const gameId = '#156D5E8';

  useEffect(() => {
    if (isLogged && players.length < 1) {
      dispatch(saveFirstPlayer({ id, name, avatar }));
    }
  }, [avatar, dispatch, id, isLogged, name, players.length]);

  const handleAddPlayer = () => {
    console.log('Add player');
    // if (players.length < 5) {
    //   setPlayers([...players, { id: uniqid() }]);
    // }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeletePlayer = (playerId: string) => {
    console.log('Remove player');
    // const newPlayersList = players.filter((player) => player.id !== playerId);
    // setPlayers([...newPlayersList]);
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
              id={player.id}
              name={player.name}
              avatar={player.avatar}
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
