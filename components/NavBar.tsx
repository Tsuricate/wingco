/* eslint-disable @typescript-eslint/no-unused-vars */
import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import NavMenu from './NavMenu';

const NavBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex bg="tomato" justifyContent="space-evenly">
        <Heading>Wingspan Companion</Heading>
        <IconButton aria-label="Open menu" icon={<HamburgerIcon />} onClick={onOpen} />
      </Flex>
      {isOpen && <NavMenu />}
    </>
  );
};

export default NavBar;
