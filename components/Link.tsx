import React from 'react';
import NextLink from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

interface LinkProps {
  url: string;
  label: string;
}

const Link: React.FC<LinkProps> = ({ url, label }) => {
  return (
    <NextLink href={url} passHref>
      <ChakraLink>{label}</ChakraLink>
    </NextLink>
  );
};

export default Link;
