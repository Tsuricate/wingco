import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GameForm from '../../components/GameForm';
import { useEffect } from 'react';
import { saveGameSlug, setFirstPlayer } from '../../redux/actions/newGame';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { defaultScores } from '../../constants/game';

const NewGamePage = () => {
  const dispatch = useDispatch();
  const { id, name, avatar } = useSelector((state: RootState) => state.auth);

  const gameSlug = Math.random().toString(36).substring(2, 8).toUpperCase();

  useEffect(() => {
    dispatch(saveGameSlug(gameSlug));
  }, []);

  useEffect(() => {
    if (name) {
      dispatch(setFirstPlayer({ id, name, avatar, isRegistered: true, scores: defaultScores }));
    }
  }, [name]);

  return <GameForm isEditing={false} />;
};

export default NewGamePage;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['newGame', 'common, validations'])),
  },
});
