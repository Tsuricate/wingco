import { Field, Button, Stack, Input, InputGroup } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { ReactElement, useState } from 'react';
import { SafeFieldErrorText, SafeFieldHelperText, SafeFieldLabel } from './ui/chakraFixes';

interface FormControlProps {
  id: string;
  label: string;
  name: string;
  value?: string;
  updateField: (value: string, name: string) => void;
  helperText?: string;
  leftSlot?: ReactElement;
  rightSlot?: ReactElement;
  errors?: Array<string>;
  isReadOnly?: boolean;
  isDisabled?: boolean;
}

const FormControl: React.FC<FormControlProps> = ({
  id,
  label,
  name,
  value,
  updateField,
  helperText,
  leftSlot,
  rightSlot,
  errors = [],
  isReadOnly = false,
  isDisabled = false,
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const isInvalid: boolean = errors.length > 0;

  const manageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(event.target.value.trim(), name);
  };

  return (
    <Field.Root invalid={isInvalid} readOnly={isReadOnly} id={id}>
      <SafeFieldLabel htmlFor={id}>{label}</SafeFieldLabel>
      {['password', 'passwordValidation'].includes(name) ? (
        <Stack>
          <InputGroup
            endElement={
              <Button h={7} size="sm" onClick={handleClick} disabled={isDisabled}>
                {show ? t('common:hide') : t('common:show')}
              </Button>
            }
          >
            <Input
              autoComplete="off"
              type={show ? 'text' : 'password'}
              id={id}
              name={name}
              value={value}
              onChange={manageChange}
              disabled={isDisabled}
              required
            />
          </InputGroup>
        </Stack>
      ) : (
        <Stack direction="row" align="center" gap={5}>
          {leftSlot}
          <Input
            id={id}
            name={name}
            value={value}
            onChange={manageChange}
            required
            disabled={isDisabled}
          />
          {rightSlot}
        </Stack>
      )}

      {!isInvalid ? (
        <SafeFieldHelperText>{helperText}</SafeFieldHelperText>
      ) : (
        errors.map((error) => <SafeFieldErrorText key={error}>{error}</SafeFieldErrorText>)
      )}
    </Field.Root>
  );
};

export default FormControl;
