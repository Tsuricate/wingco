import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
