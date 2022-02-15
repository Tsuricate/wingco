import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import NavMenu from './NavMenu';

const NavBar: React.FC = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Box as="header">
      <Flex justifyContent="space-between">
        <Heading>WingCo</Heading>
        <IconButton
          data-cy="burgerButton"
          aria-label="Open menu"
          display={{ md: 'none' }}
          icon={<HamburgerIcon />}
          onClick={onToggle}
        />
        <Box display={{ base: 'none', md: 'block' }}>
          <NavMenu direction="row" />
        </Box>
      </Flex>
      <Box display={{ base: isOpen ? 'block' : 'none', md: 'none' }}>
        <NavMenu onClick={onClose} direction="column" />
      </Box>
    </Box>
  );
};

export default NavBar;
