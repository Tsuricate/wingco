import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import FormActions from './FormActions';
import FormControl from './FormControl';

interface PasswordAssistStep2Props {
  onSubmit: () => void;
}

const PasswordAssistStep2: React.FC<PasswordAssistStep2Props> = ({ onSubmit }) => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <>
      <Text>{t('descriptionStep2', { ns: 'passwordAssistance' })}</Text>
      <FormControl
        id="resetCode"
        name="resetCode"
        label={t('resetCodeLabel', { ns: 'passwordAssistance' })}
        helperText={t('resetCodeHelperText', { ns: 'passwordAssistance' })}
      />
      <FormActions cancelUrl="/sign-in" onSubmit={handleSubmit} />
    </>
  );
};

export default PasswordAssistStep2;
