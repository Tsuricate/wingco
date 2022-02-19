import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Button from '../components/Button';
import FormControl from '../components/FormControl';
import FormLayout from '../components/FormLayout';
import Link from '../components/Link';
import PageLayout from '../components/PageLayout';

const PasswordAssistance = () => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  const handleSubmit = () => {
    console.log('Button clicked');
  };

  return (
    <PageLayout title={t('title')}>
      <FormLayout>
        <Text>{t('description', { ns: 'passwordAssistance' })}</Text>
        <FormControl
          id="email"
          name="email"
          label={t('emailLabel', { ns: 'passwordAssistance' })}
          helperText={t('emailHelperText', { ns: 'passwordAssistance' })}
        />
        <Link href="/sign-in" dataCy="cancelAction">
          {t('cancel', { ns: 'commom' })}
        </Link>
        <Button type="submit" dataCy="submitButton" onClick={handleSubmit}>
          {t('continue', { ns: 'common' })}
        </Button>
      </FormLayout>
    </PageLayout>
  );
};

export default PasswordAssistance;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['passwordAssistance', 'common'])),
  },
});
