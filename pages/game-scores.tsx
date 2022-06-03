import { Stack, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Form from '../components/Form';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import Modal from '../components/Modal';
import ScoresSection from '../components/ScoresSection';
import { Category } from '../models/game';
import { RootState } from '../redux/reducers';
import { wrapper } from '../redux/store';
import { getCategories } from '../utils/game';

const GameScores: React.FC = () => {
  const { t } = useTranslation(['gameScores', 'newGame', 'common']);
  const { categories, gameSlug, players, isCreatingNewGame } = useSelector(
    (state: RootState) => state.game
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleSubmit = () => {
    console.log('Submit !');
  };

  return (
    <PageLayout title={t('gameScores:title')}>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          {categories.map((category: Category) => (
            <ScoresSection key={category.id} category={category.name} players={players} />
          ))}
        </Stack>
        <Link asButton href={`/game-results?gameId=${gameSlug}`} buttonVariant="solid">
          {t('gameScores:computeScores')}
        </Link>
      </Form>
      <Modal
        title={isCreatingNewGame ? t('newGame:creatingGame') : t('newGame:gameCreated')}
        description={t('newGame:gameCreatedDescription')}
        handleClose={onClose}
        isOpen={isOpen}
        firstActionButton={t('gameScores:enterScores')}
        handleFirstAction={onClose}
      ></Modal>
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
