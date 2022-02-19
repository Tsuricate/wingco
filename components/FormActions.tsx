import { Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Button from './Button';
import Link from './Link';

interface FormActionsProps {
  cancelUrl: string;
  onSubmit: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ cancelUrl, onSubmit }) => {
  const { t } = useTranslation('common');

  return (
    <Stack direction="row">
      <Link href={cancelUrl} dataCy="cancelAction">
        {t('cancel', { ns: 'commom' })}
      </Link>
      <Button type="submit" dataCy="submitButton" onClick={onSubmit}>
        {t('continue', { ns: 'common' })}
      </Button>
    </Stack>
  );
};

export default FormActions;
