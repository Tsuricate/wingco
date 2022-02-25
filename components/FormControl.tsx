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
  helperText?: string;
  leftSlot?: ReactElement;
  rightSlot?: ReactElement;
}

const FormControl: React.FC<FormControlProps> = ({
  id,
  label,
  name,
  helperText,
  leftSlot,
  rightSlot,
}) => {
  return (
    <ChakraFormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Stack direction="row" align="center">
        {leftSlot}
        <Input id={id} name={name} />
        {rightSlot}
      </Stack>
      <FormHelperText>{helperText}</FormHelperText>
    </ChakraFormControl>
  );
};

export default FormControl;
