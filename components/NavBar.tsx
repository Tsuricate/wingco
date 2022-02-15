/* eslint-disable @typescript-eslint/no-unused-vars */
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import NavMenu from './NavMenu';

const NavBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="header">
      <Flex bg="tomato" justifyContent="space-evenly">
        <Heading>Wingspan Companion</Heading>
        <IconButton
          data-cy="burgerButton"
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
      </Flex>
      <Box display={isOpen ? 'block' : 'none'}>
        <NavMenu />
      </Box>
    </Box>
  );
};

export default NavBar;
