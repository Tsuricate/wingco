import { Divider, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Button from '../../components/Button';
import FormControl from '../../components/FormControl';
import Form from '../../components/Form';
import PageLayout from '../../components/layout/PageLayout';
import Link from '../../components/Link';
import { NextPageWithAuth } from '../../models/pageWithAuth';

const ManageAccount: NextPageWithAuth = () => {
  const { t } = useTranslation(['manageAccount', 'common']);

  const updateField = () => {
    console.log('Update');
  };

  const handleSave = () => {
    console.log('Informations has been changed !');
  };
  const handleDelete = () => {
    console.log('Account deleted !');
  };

  const email = 'tsuricate@gmail.com';
  return (
    <PageLayout title={t('manageAccount:title')}>
      <Form onSubmit={handleSave}>
        <Text>{t('manageAccount:description')}</Text>
        <Divider />
        <FormControl
          id="username"
          name="username"
          label={t('common:usernameLabel')}
          helperText={t('manageAccount:usernameHelperText')}
          updateField={updateField}
        />
        <FormControl
          id="email"
          name="email"
          label={t('common:emailLabel')}
          helperText={t('manageAccount:emailHelperText')}
          updateField={updateField}
        />
        <Divider />
        <Button type="submit">{t('common:save')}</Button>
        <Divider />
        <Link href={`/password-assistance?email=${email}`}>
          {t('manageAccount:changePassword')}
        </Link>
        <Divider />
        <Button onClick={handleDelete}>{t('manageAccount:delete')}</Button>
      </Form>
    </PageLayout>
  );
};

export default ManageAccount;

ManageAccount.requireAuth = true;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['manageAccount', 'common'])),
  },
});
