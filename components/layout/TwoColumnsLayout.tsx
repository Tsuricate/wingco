import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';

interface TwoColumnsLayoutProps {
  noSpacing?: boolean;
}

const TwoColumnsLayout: React.FC<TwoColumnsLayoutProps> = ({ children, noSpacing }) => {
  const spacing = noSpacing ? 0 : 2;

  return (
    <SimpleGrid spacing={spacing} columns={{ base: 1, sm: 2 }}>
      {children}
    </SimpleGrid>
  );
};

export default TwoColumnsLayout;
