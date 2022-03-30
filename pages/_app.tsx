import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { wrapper } from '../redux/store';
import AuthGuard from '../components/AuthGuard';
import { NextPageWithAuth } from '../models/pageWithAuth';

interface MyAppProps extends AppProps {
  Component: NextPageWithAuth;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default wrapper.withRedux(appWithTranslation(MyApp));
