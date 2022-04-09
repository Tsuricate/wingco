import {
  Button as ChakraButton,
  ButtonProps,
  Link as ChakraLink,
  LinkOverlay as ChakraLinkOverlay,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { buttonDefaultStyle } from './Button';

interface LinkProps {
  href: string;
  dataCy?: string;
  asButton?: boolean;
  buttonVariant?: ButtonProps['variant'];
  asOverlay?: boolean;
  isExternal?: boolean;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  dataCy,
  asButton = false,
  buttonVariant = 'outline',
  asOverlay = false,
  isExternal,
}) => {
  return isExternal ? (
    <ChakraLink href={href}>{children}</ChakraLink>
  ) : (
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
        <ChakraLink as={asOverlay ? ChakraLinkOverlay : ChakraLink} data-cy={dataCy}>
          {children}
        </ChakraLink>
      )}
    </NextLink>
  );
};

export default Link;
