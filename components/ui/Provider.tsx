import { ChakraProvider } from '@chakra-ui/react';
import { system } from '../../theme';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Provider({ children }: Props) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
