import React, { ReactElement } from 'react';
import { Field, Stack, Input, InputGroup, VisuallyHidden, Box } from '@chakra-ui/react';
import { SafeFieldErrorText, SafeFieldLabel } from './ui/chakraFixes';
import { PasswordInput } from './ui/password-input';

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
  startElement?: any;
  extraElement?: React.ReactNode;
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
  startElement,
  extraElement,
}) => {
  const isInvalid: boolean = errors.length > 0;

  const manageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(event.target.value.trim(), name);
  };

  return (
    <Field.Root invalid={isInvalid} readOnly={isReadOnly} id={id}>
      <VisuallyHidden>
        <SafeFieldLabel htmlFor={id}>{label}</SafeFieldLabel>
      </VisuallyHidden>
      {['password', 'passwordValidation'].includes(name) ? (
        <Stack width="100%">
          <PasswordInput
            autoComplete="off"
            id={id}
            name={name}
            value={value}
            onChange={manageChange}
            placeholder={helperText}
            required
            size="lg"
          />
          {extraElement && <Box maxW="300px">{extraElement}</Box>}
        </Stack>
      ) : (
        <Stack direction="row" align="center" gap={5} width="100%">
          {leftSlot}
          <InputGroup startElement={startElement}>
            <Input
              id={id}
              name={name}
              value={value}
              onChange={manageChange}
              required
              disabled={isDisabled}
              placeholder={helperText}
              size="lg"
            />
          </InputGroup>
          {rightSlot}
        </Stack>
      )}
      {!isInvalid && errors.map((error) => <SafeFieldErrorText key={error}>{error}</SafeFieldErrorText>)}
    </Field.Root>
  );
};

export default FormControl;
