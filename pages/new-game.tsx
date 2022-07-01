import { FormControl, FormLabel, Stack, Switch, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Pusher from 'pusher-js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import Form from '../components/Form';
import InvitePlayerButton from '../components/InvitePlayerButton';
import PageLayout from '../components/layout/PageLayout';
import Modal from '../components/Modal';
import NewGamePlayer from '../components/NewGamePlayer';
import { defaultPlayer, defaultScores } from '../constants/game';
import { IGamePlayer, Player } from '../models/players';
import { addPlayerInQueue, answerJoinRequest, deletePlayerInQueue } from '../redux/actions/joinGame';
import {
  addPlayer,
  createNewGame,
  removePlayer,
  saveGameSlug,
  updateGameWithNectar,
  updatePlayerInfos,
} from '../redux/actions/newGame';
import { RootState } from '../redux/reducers';
import { getEstimatedTime } from '../utils/newGame';

const NewGame: React.FC = () => {
  const { t } = useTranslation(['common', 'newGame']);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { gameSlug, players, gameWithNectar } = useSelector((state: RootState) => state.game);
  const { playersInQueue } = useSelector((state: RootState) => state.joinGame);
  const hasReachedMaxPlayers = players.length === 5;
  const estimatedTime = getEstimatedTime(players.length * 35);

  useEffect(() => {
    const gameSlug = Math.random().toString(36).substring(2, 8).toUpperCase();
    dispatch(saveGameSlug(gameSlug));
  }, [dispatch]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
      cluster: 'eu',
    });
    const channel = pusher.subscribe(`game-${gameSlug}`);
    channel.bind('join-game-request', async (data: { player: Player }) => {
      dispatch(addPlayerInQueue(data.player));
      onOpen();
    });
    return () => {
      pusher.unsubscribe('join-game-request');
    };
  }, [dispatch, gameSlug, onOpen]);

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateGameWithNectar(event.target.checked));
  };

  const handleAddPlayer = (invitedPlayer: Player | undefined) => {
    if (!hasReachedMaxPlayers) {
      const player = invitedPlayer
        ? {
            ...invitedPlayer,
            isRegistered: true,
            scores: defaultScores,
          }
        : defaultPlayer;
      dispatch(addPlayer(player));
    }
  };

  const handleUpdatePlayerInfos = (value: string, playerId: string) => {
    dispatch(updatePlayerInfos(value, playerId));
  };

  const handleDeletePlayer = (playerId: string) => {
    dispatch(removePlayer(playerId));
  };

  const handleSubmit = () => {
    router.push('/game-scores');
    dispatch(createNewGame());
  };

  const handleAnswerJoinRequest = (player: Player, isAccepted: boolean) => {
    dispatch(answerJoinRequest(player.id, isAccepted, gameSlug));
    if (isAccepted) handleAddPlayer(player);
    dispatch(deletePlayerInQueue(player.id));
    onClose();
    if (playersInQueue.length > 0) onOpen();
  };

  return (
    <PageLayout title={t('newGame:title')}>
      <Text>ID {gameSlug}</Text>
      <Form onSubmit={handleSubmit}>
        <Stack>
          {players.map((player: IGamePlayer, index: number) => (
            <NewGamePlayer
              key={player.id}
              id={player.id}
              name={player.name}
              avatar={player.avatar}
              isRegistered={player.isRegistered}
              playerNumber={index + 1}
              onDeletePlayer={() => handleDeletePlayer(player.id)}
              updateField={(value) => handleUpdatePlayerInfos(value, player.id)}
            />
          ))}
        </Stack>
        <Button isDisabled={hasReachedMaxPlayers} onClick={() => handleAddPlayer(undefined)}>
          {t('newGame:addPlayer')}
        </Button>
        <InvitePlayerButton />
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="useNectar">{t('newGame:useNectar')}</FormLabel>
          <Switch id="useNectar" isChecked={gameWithNectar} onChange={handleSwitch} />
        </FormControl>
        <Text>{t('newGame:estimatedTime', { duration: estimatedTime })}</Text>
        <Button type="submit">{t('newGame:startGame')}</Button>
      </Form>
      {playersInQueue.length > 0 && (
        <Modal
          key={playersInQueue[0].id}
          isOpen={isOpen}
          handleClose={() => onClose()}
          title={t('newGame:joiningGame', { player: playersInQueue[0].name })}
          firstActionButton={t('common:accept')}
          handleFirstAction={() => handleAnswerJoinRequest(playersInQueue[0], true)}
          secondActionButton={t('common:decline')}
          handleSecondAction={() => handleAnswerJoinRequest(playersInQueue[0], false)}
        ></Modal>
      )}
    </PageLayout>
  );
};

export default NewGame;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['newGame', 'common'])),
  },
});
