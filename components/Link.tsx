import { Button as ChakraButton, ButtonProps, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { buttonDefaultStyle } from './Button';

interface LinkProps {
  href: string;
  dataCy?: string;
  asButton?: boolean;
  buttonVariant?: ButtonProps['variant'];
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  dataCy,
  asButton = false,
  buttonVariant = 'outline',
}) => {
  return (
    <NextLink href={href} passHref>
      {asButton ? (
        <ChakraButton
          as={ChakraLink}
          data-cy={dataCy}
          css={{
            ':hover': {
              textDecoration: 'none',
            },
          }}
          variant={buttonVariant}
          {...buttonDefaultStyle}
        >
          {children}
        </ChakraButton>
      ) : (
        <ChakraLink data-cy={dataCy}>{children}</ChakraLink>
      )}
    </NextLink>
  );
};

export default Link;
