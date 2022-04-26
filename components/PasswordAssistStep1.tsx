import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import FormControl from './FormControl';

interface PasswordAssistanceProps {
  value?: string;
  updateField: (value: string, name: string) => void;
  errors?: Array<string>;
}

const PasswordAssistStep1: React.FC<PasswordAssistanceProps> = ({ value, updateField, errors }) => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  return (
    <>
      <Text>{t('passwordAssistance:description')}</Text>
      <FormControl
        id="email"
        name="email"
        value={value}
        label={t('common:emailLabel')}
        helperText={t('common:emailHelperText')}
        updateField={updateField}
        errors={errors}
      />
    </>
  );
};

export default PasswordAssistStep1;
