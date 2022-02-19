import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Button from './Button';
import FormControl from './FormControl';
import Link from './Link';

interface PasswordAssistStep2Props {
  onSubmit: () => void;
}

const PasswordAssistStep2: React.FC<PasswordAssistStep2Props> = ({ onSubmit }) => {
  const { t } = useTranslation(['passwordAssistance', 'common']);

  const handleClick = () => {
    onSubmit();
  };

  return (
    <>
      <Text>{t('descriptionStep2', { ns: 'passwordAssistance' })}</Text>
      <FormControl
        id="resetCode"
        name="resetCode"
        label={t('resetCodeLabel', { ns: 'passwordAssistance' })}
        helperText={t('resetCodeHelperText', { ns: 'passwordAssistance' })}
      />
      <Link href="/sign-in" dataCy="cancelAction">
        {t('cancel', { ns: 'commom' })}
      </Link>
      <Button type="submit" dataCy="submitButton" onClick={handleClick}>
        {t('continue', { ns: 'common' })}
      </Button>
    </>
  );
};

export default PasswordAssistStep2;
