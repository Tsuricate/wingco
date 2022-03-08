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

  const updateField = () => {
    console.log('Update');
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <>
      <Text>{t('passwordAssistance:descriptionStep2')}</Text>
      <FormControl
        id="resetCode"
        name="resetCode"
        label={t('passwordAssistance:resetCodeLabel')}
        helperText={t('passwordAssistance:resetCodeHelperText')}
        updateField={updateField}
      />
      <FormActions cancelUrl="/sign-in" onSubmit={handleSubmit} />
    </>
  );
};

export default PasswordAssistStep2;
