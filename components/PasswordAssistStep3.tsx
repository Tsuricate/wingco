import { useTranslation } from 'next-i18next';
import React from 'react';
import AlertMessage from './AlertMessage';
import FormActions from './FormActions';
import FormControl from './FormControl';

interface PasswordAssistanceProps {
  updateField: (value: string, name: string) => void;
  password: string;
  passwordValidation: string;
  errors?: Array<string>;
}

const PasswordAssistStep3: React.FC<PasswordAssistanceProps> = ({
  password,
  passwordValidation,
  updateField,
  errors,
}) => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  return (
    <>
      <AlertMessage status="success">{t('passwordAssistance:descriptionStep3')}</AlertMessage>
      <FormControl
        id="password"
        name="password"
        value={password}
        label={t('passwordAssistance:newPasswordLabel')}
        helperText={t('passwordAssistance:newPasswordHelperText')}
        updateField={updateField}
        errors={errors}
      />
      <FormControl
        id="passwordValidation"
        name="passwordValidation"
        value={passwordValidation}
        label={t('passwordAssistance:newPasswordValidationLabel')}
        helperText={t('passwordAssistance:newPasswordValidationHelperText')}
        updateField={updateField}
        errors={errors}
      />
      <FormActions cancelUrl="/sign-in" />
    </>
  );
};

export default PasswordAssistStep3;
