import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import NavBar from './NavBar';

interface PageLayoutProps {
  title: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content="Wingspan Companion App" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <NavBar />
    <Container as="main" maxW={{ xl: '2xl' }}>
      {children}
    </Container>
  </>
);

export default PageLayout;
