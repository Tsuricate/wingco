import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import FormActions from './FormActions';
import FormControl from './FormControl';

const PasswordAssistStep2: React.FC = () => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  const updateField = () => {
    console.log('Update');
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
      <FormActions cancelUrl="/sign-in" />
    </>
  );
};

export default PasswordAssistStep2;
