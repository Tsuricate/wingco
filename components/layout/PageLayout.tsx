import React from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import NavBar from '../NavBar';

interface PageLayoutProps {
  title?: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => (
  <Box display="flex" flexDirection="column" minH="100vh">
    <Head>
      <title>{title}</title>
      <meta name="description" content="Wingspan Companion App" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar />

    <Container display="flex" flexDirection="column" as="main" flex="1" my={4}>
      <Heading as="h1">{title}</Heading>
      {children}
    </Container>
  </Box>
);

export default PageLayout;
