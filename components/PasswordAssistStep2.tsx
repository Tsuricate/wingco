import { useTranslation } from 'next-i18next';
import React from 'react';
import AlertMessage from './AlertMessage';
import FormActions from './FormActions';
import FormControl from './FormControl';

const PasswordAssistStep2: React.FC = () => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  const updateField = () => {
    console.log('Update');
  };

  return (
    <>
      <AlertMessage status="success">{t('passwordAssistance:descriptionStep2')}</AlertMessage>
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
