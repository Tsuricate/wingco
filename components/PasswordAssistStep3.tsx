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
      <Text>{t('passwordAssistance:descriptionStep3')}</Text>
      <FormControl
        id="password"
        name="password"
        label={t('passwordAssistance:newPasswordLabel')}
        helperText={t('passwordAssistance:newPasswordHelperText')}
      />
      <FormControl
        id="passwordValidation"
        name="passwordValidation"
        label={t('passwordAssistance:newPasswordValidationLabel')}
        helperText={t('passwordAssistance:newPasswordValidationHelperText')}
      />
      <FormActions cancelUrl="/sign-in" onSubmit={handleSubmit} />
    </>
  );
};

export default PasswordAssistStep3;
