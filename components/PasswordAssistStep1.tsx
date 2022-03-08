import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import FormActions from './FormActions';
import FormControl from './FormControl';

interface PasswordAssistStep1Props {
  onSubmit: () => void;
}

const PasswordAssistStep1: React.FC<PasswordAssistStep1Props> = ({ onSubmit }) => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  const updateField = () => {
    console.log('Update');
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <>
      <Text>{t('passwordAssistance:description')}</Text>
      <FormControl
        id="email"
        name="email"
        label={t('common:emailLabel')}
        helperText={t('common:emailHelperText')}
        updateField={updateField}
      />
      <FormActions cancelUrl="/sign-in" onSubmit={handleSubmit} />
    </>
  );
};

export default PasswordAssistStep1;
