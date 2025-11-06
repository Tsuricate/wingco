import React from 'react';
import { useTranslation } from 'next-i18next';
import FormControl from './FormControl';
import { HiOutlineMail } from 'react-icons/hi';
import { Stack, Text } from '@chakra-ui/react';

interface PasswordAssistanceProps {
  value?: string;
  updateField: (value: string, name: string) => void;
  errors?: Array<string>;
}

const PasswordAssistStep1: React.FC<PasswordAssistanceProps> = ({ value, updateField, errors }) => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  return (
    <Stack gap={4} py={4}>
      <Text>{t('passwordAssistance:description')}</Text>
      <FormControl
        id="email"
        name="email"
        value={value}
        label={t('common:emailLabel')}
        helperText={t('common:emailHelperText')}
        updateField={updateField}
        errors={errors}
        startElement={<HiOutlineMail />}
      />
    </Stack>
  );
};

export default PasswordAssistStep1;
