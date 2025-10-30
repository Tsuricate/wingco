import { Button as ChakraButton, ButtonProps, Link as ChakraLink } from '@chakra-ui/react';
import { LinkBaseProps } from '@chakra-ui/react/dist/types/components/link/link';
import NextLink from 'next/link';
import React from 'react';

interface LinkProps {
  href: string;
  dataCy?: string;
  isExternal?: boolean;
  asButton?: boolean;
  buttonVariant?: ButtonProps['variant'];
  linkVariant?: LinkBaseProps['variant'];
  onClick?: () => void;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  dataCy,
  isExternal,
  asButton = false,
  buttonVariant = 'outline',
  linkVariant = 'plain',
  onClick,
}) => {
  if (isExternal) {
    return (
      <ChakraLink
        href={href}
        data-cy={dataCy}
        rel="noopener noreferrer"
        _hover={{ textDecoration: 'none' }}
      >
        {children}
      </ChakraLink>
    );
  }

  if (asButton) {
    return (
      <ChakraButton
        asChild
        variant={buttonVariant}
        data-cy={dataCy}
        onClick={onClick}
        _hover={{ textDecoration: 'none' }}
      >
        <NextLink href={href}>{children}</NextLink>
      </ChakraButton>
    );
  }

  return (
    <ChakraLink
      as={NextLink}
      href={href}
      variant={linkVariant}
      data-cy={dataCy}
      _hover={{ textDecoration: 'none' }}
    >
      {children}
    </ChakraLink>
  );
};

export default Link;
