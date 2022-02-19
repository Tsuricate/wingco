import { useTranslation } from 'next-i18next';
import React from 'react';
import Button from './Button';
import TwoColumnsLayout from './layout/TwoColumnsLayout';
import Link from './Link';

interface FormActionsProps {
  cancelUrl: string;
  onSubmit: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ cancelUrl, onSubmit }) => {
  const { t } = useTranslation('common');

  return (
    <TwoColumnsLayout>
      <Link href={cancelUrl} dataCy="cancelAction">
        {t('cancel', { ns: 'commom' })}
      </Link>
      <Button type="submit" dataCy="submitButton" onClick={onSubmit}>
        {t('continue', { ns: 'common' })}
      </Button>
    </TwoColumnsLayout>
  );
};

export default FormActions;
