import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import NavMenu from './NavMenu';

const NavBar: React.FC = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Box as="header">
      <Flex justifyContent="space-evenly">
        <Heading>Wingspan Companion</Heading>
        <IconButton
          data-cy="burgerButton"
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          onClick={onToggle}
        />
      </Flex>
      <Box display={isOpen ? 'block' : 'none'}>
        <NavMenu onClick={onClose} />
      </Box>
    </Box>
  );
};

export default NavBar;
