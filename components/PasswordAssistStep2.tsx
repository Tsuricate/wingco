import { useTranslation } from 'next-i18next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetPasswordEmail } from '../redux/actions/passwordAssistance';
import { RootState } from '../redux/reducers';
import AlertMessage from './AlertMessage';
import Button from './Button';
import FormControl from './FormControl';

interface PasswordAssistanceProps {
  value?: string;
  updateField: (value: string, name: string) => void;
  email: string;
  errors?: Array<string>;
}

const PasswordAssistStep2: React.FC<PasswordAssistanceProps> = ({
  value,
  updateField,
  email,
  errors,
}) => {
  const { t } = useTranslation(['passwordAssistance', 'common']);
  const { hasSubmitResetCode, hasCorrectResetCode, isLoading } = useSelector(
    (state: RootState) => state.passwordAssistance
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(sendResetPasswordEmail());
  };

  return (
    <>
      {!hasSubmitResetCode && (
        <AlertMessage status="success">{t('passwordAssistance:descriptionStep2')}</AlertMessage>
      )}
      {hasSubmitResetCode && !hasCorrectResetCode && (
        <AlertMessage status="error">
          {t('passwordAssistance:errorStep2', { email })}
          <Button
            variant="outline"
            onClick={handleClick}
            isLoading={isLoading}
            loadingText={t('common:submitting')}
          >
            {t('passwordAssistance:sendNewResetCode')}
          </Button>
        </AlertMessage>
      )}
      <FormControl
        id="resetCode"
        name="resetCode"
        value={value}
        updateField={updateField}
        label={t('passwordAssistance:resetCodeLabel')}
        helperText={t('passwordAssistance:resetCodeHelperText')}
        errors={errors}
      />
    </>
  );
};

export default PasswordAssistStep2;
