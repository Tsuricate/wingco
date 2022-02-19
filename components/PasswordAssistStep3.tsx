import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Button from './Button';
import FormControl from './FormControl';
import Link from './Link';

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
      <Link href="/sign-in" dataCy="cancelAction">
        {t('cancel', { ns: 'commom' })}
      </Link>
      <Button type="submit" dataCy="submitButton" onClick={handleSubmit}>
        {t('continue', { ns: 'common' })}
      </Button>
    </>
  );
};

export default PasswordAssistStep3;
