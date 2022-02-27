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
    <Stack direction={{ base: 'column', md: 'row-reverse' }}>
      <Button type="submit" dataCy="submitButton" onClick={onSubmit}>
        {t('common:continue')}
      </Button>
      <Link href={cancelUrl} dataCy="cancelAction" asButton>
        {t('common:cancel')}
      </Link>
    </Stack>
  );
};

export default FormActions;
