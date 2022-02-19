import {
  FormControl as ChakraFormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';

interface FormControlProps {
  id: string;
  label: string;
  name: string;
  helperText: string;
}

const FormControl: React.FC<FormControlProps> = ({ id, label, name, helperText }) => {
  return (
    <ChakraFormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input id={id} name={name} />
      <FormHelperText>{helperText}</FormHelperText>
    </ChakraFormControl>
  );
};

export default FormControl;
