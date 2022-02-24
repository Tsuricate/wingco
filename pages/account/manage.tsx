import { Divider, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Button from '../../components/Button';
import FormControl from '../../components/FormControl';
import FormLayout from '../../components/layout/FormLayout';
import PageLayout from '../../components/layout/PageLayout';
import Link from '../../components/Link';

const ManageAccount = () => {
  const { t } = useTranslation(['manageAccount', 'common']);
  const handleSave = () => {
    console.log('Informations has been changed !');
  };
  const handleDelete = () => {
    console.log('Account deleted !');
  };

  const email = 'tsuricate@gmail.com';
  return (
    <PageLayout title={t('title')}>
      <FormLayout>
        <Text>{t('description')}</Text>
        <Divider />
        <FormControl
          id="username"
          name="username"
          label={t('usernameLabel', { ns: 'common' })}
          helperText={t('usernameHelperText')}
        />
        <FormControl
          id="email"
          name="email"
          label={t('emailLabel', { ns: 'common' })}
          helperText={t('emailHelperText')}
        />
        <Divider />
        <Button onClick={handleSave}>{t('save', { ns: 'common' })}</Button>
        <Divider />
        <Link href={`/password-assistance?email=${email}`}>{t('changePassword')}</Link>
        <Divider />
        <Button onClick={handleDelete}>{t('delete')}</Button>
      </FormLayout>
    </PageLayout>
  );
};

export default ManageAccount;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['manageAccount', 'common'])),
  },
});
