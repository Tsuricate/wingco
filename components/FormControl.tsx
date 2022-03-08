import {
  FormControl as ChakraFormControl,
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
}) => {
  const manageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField(event.target.value, name);
  };

  return (
    <ChakraFormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Stack direction="row" align="center">
        {leftSlot}
        <Input id={id} name={name} value={value} onChange={manageChange} />
        {rightSlot}
      </Stack>
      <FormHelperText>{helperText}</FormHelperText>
    </ChakraFormControl>
  );
};

export default FormControl;
