import { useRouter } from 'next/router';
import GameForm from '../../components/GameForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';
import { getGameBySlug } from '../../utils/api/gameUtils';
import { GameWithPlayers } from '../../models/game';
import { sortPlayersByHost } from '../../utils/newGame';

const EditGamePage: React.FC<{ game: GameWithPlayers }> = ({ game }) => {
  const router = useRouter();
  const { gameSlug } = router.query;

  return <GameForm isEditing={true} urlGameSlug={gameSlug as string} game={game} />;
};

export default EditGamePage;

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const gameSlug = params?.gameSlug;
    if (typeof gameSlug !== 'string') throw new Error('Invalid game slug');

    const game = await getGameBySlug(gameSlug, true);
    if (!game) return { notFound: true };

    const orderedGame = sortPlayersByHost(game);

    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', [
          'gameScores',
          'newGame',
          'common',
          'validations',
        ])),
        game: orderedGame,
      },
    };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};
