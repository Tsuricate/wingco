import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
