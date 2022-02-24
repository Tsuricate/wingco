import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import FormLayout from '../components/layout/FormLayout';
import PageLayout from '../components/layout/PageLayout';
import NewGamePlayer from '../components/NewGamePlayer';

const NewGame: React.FC = () => {
  const { t } = useTranslation('newGame');
  return (
    <PageLayout title={t('title')}>
      <Text>ID #156D5E8</Text>
      <FormLayout>
        <NewGamePlayer />
      </FormLayout>
    </PageLayout>
  );
};

export default NewGame;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['newGame', 'common'])),
  },
});
