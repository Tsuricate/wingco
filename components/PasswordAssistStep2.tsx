import { useTranslation } from 'next-i18next';
import React from 'react';
import AlertMessage from './AlertMessage';
import FormActions from './FormActions';
import FormControl from './FormControl';

interface PasswordAssistanceProps {
  value?: string;
  updateField: (value: string, name: string) => void;
  errors?: Array<string>;
}

const PasswordAssistStep2: React.FC<PasswordAssistanceProps> = ({ value, updateField, errors }) => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  return (
    <>
      <AlertMessage status="success">{t('passwordAssistance:descriptionStep2')}</AlertMessage>
      <FormControl
        id="resetCode"
        name="resetCode"
        value={value}
        updateField={updateField}
        label={t('passwordAssistance:resetCodeLabel')}
        helperText={t('passwordAssistance:resetCodeHelperText')}
        errors={errors}
      />
      <FormActions cancelUrl="/sign-in" />
    </>
  );
};

export default PasswordAssistStep2;
