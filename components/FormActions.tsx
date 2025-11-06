import { Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Button from './Button';
import Link from './Link';

interface FormActionsProps {
  cancelUrl: string;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ cancelUrl, isLoading, loadingText, onClick }) => {
  const { t } = useTranslation('common');

  return (
    <Stack direction="column" width="100%">
      <Button type="submit" dataCy="submitButton" isLoading={isLoading} loadingText={loadingText}>
        {t('common:continue')}
      </Button>
      <Link href={cancelUrl} dataCy="cancelAction" asButton onClick={onClick}>
        {t('common:cancel')}
      </Link>
    </Stack>
  );
};

export default FormActions;
