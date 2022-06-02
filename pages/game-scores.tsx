import { Stack, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Form from '../components/Form';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import ScoresSection from '../components/ScoresSection';
import Modal from '../components/Modal';
import { categories } from '../mockData/bestScoreByCategory';
import { RootState } from '../redux/reducers';

const GameScores: React.FC = () => {
  const { t } = useTranslation(['gameScores', 'newGame', 'common']);
  const { gameSlug, players, isCreatingNewGame } = useSelector((state: RootState) => state.game);
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
          {categories.map((category) => (
            <ScoresSection key={category} category={category} players={players} />
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

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['gameScores', 'newGame', 'common'])),
  },
});
