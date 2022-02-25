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

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <>
      <Text>{t('description', { ns: 'passwordAssistance' })}</Text>
      <FormControl
        id="email"
        name="email"
        label={t('emailLabel', { ns: 'common' })}
        helperText={t('emailHelperText', { ns: 'common' })}
      />
      <FormActions cancelUrl="/sign-in" onSubmit={handleSubmit} />
    </>
  );
};

export default PasswordAssistStep1;
