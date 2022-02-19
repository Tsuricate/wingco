import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import FormActions from './FormActions';
import FormControl from './FormControl';

const PasswordAssistStep3: React.FC = () => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  const handleSubmit = () => {
    console.log('Button clicked !');
  };

  return (
    <>
      <Text>{t('descriptionStep3', { ns: 'passwordAssistance' })}</Text>
      <FormControl
        id="password"
        name="password"
        label={t('newPasswordLabel', { ns: 'passwordAssistance' })}
        helperText={t('newPasswordHelperText', { ns: 'passwordAssistance' })}
      />
      <FormControl
        id="passwordValidation"
        name="passwordValidation"
        label={t('newPasswordValidationLabel', { ns: 'passwordAssistance' })}
        helperText={t('newPasswordValidationHelperText', { ns: 'passwordAssistance' })}
      />
      <FormActions cancelUrl="/sign-in" onSubmit={handleSubmit} />
    </>
  );
};

export default PasswordAssistStep3;
