import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Stack, useDisclosure } from '@chakra-ui/react';
import Button from '../../components/Button';
import Form from '../../components/Form';
import PageLayout from '../../components/layout/PageLayout';
import Dialog from '../../components/Dialog';
import ScoresSection from '../../components/ScoresSection';
import { Category } from '../../models/game';
import { sendGameScores } from '../../redux/actions/gameScores';
import { RootState } from '../../redux/reducers';
import { getCategories, getGameBySlug } from '../../utils/api/gameUtils';
import { GetServerSideProps } from 'next/types';
import { saveCategories, initializeGamePlayers } from '../../redux/actions/newGame';
import { sortPlayersByHost } from '../../utils/newGame';

const GameScores: React.FC<{ game: any; categories: Category[] }> = ({
  game,
  categories: serverCategories,
}) => {
  const { t } = useTranslation(['gameScores', 'newGame', 'common']);
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameSlug } = router.query;
  const { players, isCreatingNewGame, categories, gameWithNectar } = useSelector(
    (state: RootState) => state.game
  );
  const { open, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (players.length === 0 && game && game.players) dispatch(initializeGamePlayers(game.players));
    if (categories.length === 0 && serverCategories?.length) dispatch(saveCategories(serverCategories));
  }, []);

  const handleSubmit = () => {
    dispatch(sendGameScores());
  };

  const effectiveCategories = categories?.length > 0 ? categories : serverCategories || [];
  const categoriesToDisplay = effectiveCategories.filter(
    (category: any) =>
      !category.isComputed && (gameWithNectar ? category : !category.isFromOceaniaExpansion)
  );

  return (
    <PageLayout title={t('gameScores:title')}>
      <Button onClick={() => router.push(`/new-game/${gameSlug}`)}>{t('gameScores:modifyGame')}</Button>
      <Form onSubmit={handleSubmit}>
        <Stack gap={5}>
          {categoriesToDisplay.map((category: any) => (
            <ScoresSection key={category.id} category={category.name} players={players} />
          ))}
        </Stack>
        <Button type="submit" variant="solid">
          {t('gameScores:computeScores')}
        </Button>
      </Form>
      <Dialog
        title={isCreatingNewGame ? t('newGame:creatingGame') : t('newGame:gameCreated')}
        handleClose={onClose}
        open={open}
        firstActionButton={t('gameScores:enterScores')}
        handleFirstAction={onClose}
      >
        <p>{t('newGame:gameCreatedDescription')}</p>
      </Dialog>
    </PageLayout>
  );
};

export default GameScores;

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const gameSlug = params?.gameSlug;

    if (typeof gameSlug !== 'string') throw new Error('Invalid game slug');

    const [game, categories] = await Promise.all([getGameBySlug(gameSlug, true), getCategories()]);

    if (!game) {
      return { notFound: true };
    }

    const orderedGame = sortPlayersByHost(game);

    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['gameScores', 'newGame', 'common'])),
        game: orderedGame,
        categories,
      },
    };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};
