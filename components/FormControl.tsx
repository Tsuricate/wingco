import {
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

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
}) => {
  const manageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(event.target.value.trim(), name);
  };

  const isInvalid: boolean = errors.length ? true : false;

  return (
    <ChakraFormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Stack direction="row" align="center">
        {leftSlot}
        <Input id={id} name={name} value={value} onChange={manageChange} required />
        {rightSlot}
      </Stack>
      {!isInvalid ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        errors.map((error) => <FormErrorMessage key={error}>{error}</FormErrorMessage>)
      )}
    </ChakraFormControl>
  );
};

export default FormControl;
