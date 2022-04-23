import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { FormError, getErrorsMessages } from '../utils/formUtils';
import AlertMessage from './AlertMessage';
import FormActions from './FormActions';
import FormControl from './FormControl';
import Link from './Link';

interface PasswordAssistanceProps {
  updateField: (value: string, name: string) => void;
  password: string;
  passwordValidation: string;
  errors: Array<FormError>;
}

const PasswordAssistStep3: React.FC<PasswordAssistanceProps> = ({
  password,
  passwordValidation,
  updateField,
  errors,
}) => {
  const { t } = useTranslation(['passwordAssistance', 'common']);
  const { hasCorrectResetCode, hasChangedPassword } = useSelector(
    (state: RootState) => state.passwordAssistance
  );
  const { isLogged } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {hasCorrectResetCode && !hasChangedPassword && (
        <AlertMessage status="success">{t('passwordAssistance:descriptionStep3')}</AlertMessage>
      )}
      {hasChangedPassword && (
        <AlertMessage status="success">
          {t('passwordAssistance:successChangePassword')}
          {isLogged ? (
            <Link asButton href="/account">
              {t('common:goToAccount')}
            </Link>
          ) : (
            <Link asButton href="/sign-in">
              {t('common:goToSignIn')}
            </Link>
          )}
        </AlertMessage>
      )}
      {!hasChangedPassword && (
        <>
          <FormControl
            id="password"
            name="password"
            value={password}
            label={t('passwordAssistance:newPasswordLabel')}
            helperText={t('passwordAssistance:newPasswordHelperText')}
            updateField={updateField}
            errors={getErrorsMessages(errors, 'password')}
          />
          <FormControl
            id="passwordValidation"
            name="passwordValidation"
            value={passwordValidation}
            label={t('passwordAssistance:newPasswordValidationLabel')}
            helperText={t('passwordAssistance:newPasswordValidationHelperText')}
            updateField={updateField}
            errors={getErrorsMessages(errors, 'passwordValidation')}
          />
          <FormActions cancelUrl="/sign-in" />
        </>
      )}
    </>
  );
};

export default PasswordAssistStep3;
