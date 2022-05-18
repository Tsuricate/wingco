import { FormControl, FormLabel, Stack, Switch, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import Button from '../components/Button';
import Form from '../components/Form';
import InvitePlayerButton from '../components/InvitePlayerButton';
import PageLayout from '../components/layout/PageLayout';
import NewGamePlayer from '../components/NewGamePlayer';
import { addPlayer, removePlayer, updatePlayerInfos } from '../redux/actions/newGame';
import { RootState } from '../redux/reducers';
import { getEstimatedTime } from '../utils/game';

const NewGame: React.FC = () => {
  const { t } = useTranslation('newGame');
  const dispatch = useDispatch();
  const { isLogged, id, name, avatar } = useSelector((state: RootState) => state.auth);
  const { players } = useSelector((state: RootState) => state.game);
  const gameId = '#156D5E8';
  const hasReachedMaxPlayers = players.length === 5;
  const estimatedTime = getEstimatedTime(players.length * 35);

  useEffect(() => {
    if (players.length < 1) {
      isLogged
        ? dispatch(addPlayer({ id, name, avatar, isRegistered: isLogged }))
        : dispatch(addPlayer({ id: uniqid(), name: '', avatar: '', isRegistered: false }));
    }
  }, [avatar, dispatch, id, isLogged, name, players.length]);

  const handleAddPlayer = () => {
    if (!hasReachedMaxPlayers) {
      dispatch(addPlayer({ id: uniqid(), name: '', avatar: '', isRegistered: false }));
    }
  };

  const handleUpdatePlayerInfos = (value: string, playerId: string) => {
    dispatch(updatePlayerInfos(value, playerId));
  };

  const handleDeletePlayer = (playerId: string) => {
    const newPlayersList = players.filter((player) => player.id !== playerId);
    dispatch(removePlayer(newPlayersList));
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
              avatar={player?.avatar}
              isRegistered={player.isRegistered}
              playerNumber={index + 1}
              onDeletePlayer={() => handleDeletePlayer(player.id)}
              updateField={(value) => handleUpdatePlayerInfos(value, player.id)}
            />
          ))}
        </Stack>
        <Button isDisabled={hasReachedMaxPlayers} onClick={handleAddPlayer}>
          {t('newGame:addPlayer')}
        </Button>
        <InvitePlayerButton />
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="useNectar">{t('newGame:useNectar')}</FormLabel>
          <Switch id="useNectar" />
        </FormControl>
        <Text>{t('newGame:estimatedTime', { duration: estimatedTime })}</Text>
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
