import React, { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { FormError, getErrorsMessages } from '../utils/formUtils';
import AlertMessage from './AlertMessage';
import FormControl from './FormControl';
import Link from './Link';
import { PasswordStrengthMeter } from './ui/password-input';
import { type Options, passwordStrength } from 'check-password-strength';

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

  const strengthOptions: Options<string> = [
    { id: 1, value: 'weak', minDiversity: 0, minLength: 0 },
    { id: 2, value: 'medium', minDiversity: 2, minLength: 6 },
    { id: 3, value: 'strong', minDiversity: 3, minLength: 8 },
    { id: 4, value: 'very-strong', minDiversity: 4, minLength: 10 },
  ];

  const strength = useMemo(
    (value = password) => {
      if (!value) return 0;
      const result = passwordStrength(value, strengthOptions);
      return result.id;
    },
    [password]
  );

  return (
    <>
      {hasCorrectResetCode && !hasChangedPassword && (
        <AlertMessage status="success" description={t('passwordAssistance:descriptionStep3')} />
      )}
      {hasChangedPassword && (
        <>
          <AlertMessage status="success" description={t('passwordAssistance:successChangePassword')} />

          {isLogged ? (
            <Link asButton href="/account">
              {t('common:goToAccount')}
            </Link>
          ) : (
            <Link asButton href="/sign-in">
              {t('common:signIn')}
            </Link>
          )}
        </>
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
            extraElement={<PasswordStrengthMeter value={strength} />}
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
        </>
      )}
    </>
  );
};

export default PasswordAssistStep3;
