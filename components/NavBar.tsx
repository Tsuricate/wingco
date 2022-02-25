import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ColorModeToggle from './ColorModeToggle';
import NavMenu from './NavMenu';

const NavBar: React.FC = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Box as="header" p={2}>
      <Flex align="center" justify="space-between">
        <Heading>WingCo</Heading>
        <Stack direction="row" display={{ md: 'none' }}>
          <ColorModeToggle />
          <IconButton
            data-cy="burgerButton"
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onToggle}
          />
        </Stack>
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
