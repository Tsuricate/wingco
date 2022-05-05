import {
  Button,
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { ReactElement, useState } from 'react';

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
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const isInvalid: boolean = errors.length ? true : false;

  return (
    <ChakraFormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {name === 'password' ? (
        <InputGroup size="md">
          <Input
            autoComplete="off"
            type={show ? 'text' : 'password'}
            id={id}
            name={name}
            value={value}
            onChange={manageChange}
            required
          />
          <InputRightElement width="4.5rem">
            <Button h={7} size="sm" onClick={handleClick}>
              {show ? t('common:hide') : t('common:show')}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Stack direction="row" align="center">
          {leftSlot}
          <Input id={id} name={name} value={value} onChange={manageChange} required />
          {rightSlot}
        </Stack>
      )}

      {!isInvalid ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        errors.map((error) => <FormErrorMessage key={error}>{error}</FormErrorMessage>)
      )}
    </ChakraFormControl>
  );
};

export default FormControl;
