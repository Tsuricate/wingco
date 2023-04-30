import { Stack, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import Form from '../components/Form';
import PageLayout from '../components/layout/PageLayout';
import Modal from '../components/Modal';
import ScoresSection from '../components/ScoresSection';
import { Category } from '../models/game';
import { sendGameScores } from '../redux/actions/gameScores';
import { RootState } from '../redux/reducers';
import { wrapper } from '../redux/store';
import { getCategories } from '../utils/api/gameUtils';

const GameScores: React.FC = () => {
  const { t } = useTranslation(['gameScores', 'newGame', 'common']);
  const dispatch = useDispatch();
  const { categories, gameWithNectar, players, isCreatingNewGame } = useSelector(
    (state: RootState) => state.game
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleSubmit = () => {
    dispatch(sendGameScores());
  };

  // Remove totalScore category (needs to be computed) && nectar category if game isn't with Oceania expansion
  const categoriesToDisplay = categories.filter(
    (category: Category) =>
      !category.isComputed && (gameWithNectar ? category : !category.isFromOceaniaExpansion)
  );

  return (
    <PageLayout title={t('gameScores:title')}>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          {categoriesToDisplay.map((category: Category) => (
            <ScoresSection key={category.id} category={category.name} players={players} />
          ))}
        </Stack>
        <Button type="submit" variant="solid">
          {t('gameScores:computeScores')}
        </Button>
      </Form>
      <Modal
        title={isCreatingNewGame ? t('newGame:creatingGame') : t('newGame:gameCreated')}
        description={t('newGame:gameCreatedDescription')}
        handleClose={onClose}
        isOpen={isOpen}
        firstActionButton={t('gameScores:enterScores')}
        handleFirstAction={onClose}
      />
    </PageLayout>
  );
};

export default GameScores;

export const getStaticProps = wrapper.getStaticProps((store) => async ({ locale }) => {
  const categories = await getCategories();
  store.dispatch({
    type: 'SAVE_CATEGORIES',
    categories,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['gameScores', 'newGame', 'common'])),
    },
  };
});
