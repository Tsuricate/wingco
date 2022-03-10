import { Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Button from './Button';
import Link from './Link';

interface FormActionsProps {
  cancelUrl: string;
}

const FormActions: React.FC<FormActionsProps> = ({ cancelUrl }) => {
  const { t } = useTranslation('common');

  return (
    <Stack direction={{ base: 'column', md: 'row-reverse' }}>
      <Button type="submit" dataCy="submitButton">
        {t('common:continue')}
      </Button>
      <Link href={cancelUrl} dataCy="cancelAction" asButton>
        {t('common:cancel')}
      </Link>
    </Stack>
  );
};

export default FormActions;
