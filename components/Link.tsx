import React from 'react';
import NextLink from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

interface LinkProps {
  href: string;
  dataCy?: string;
}

const Link: React.FC<LinkProps> = ({ href, children, dataCy }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink data-cy={dataCy}>{children}</ChakraLink>
    </NextLink>
  );
};

export default Link;
