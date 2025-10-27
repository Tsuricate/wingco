import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Provider } from '../components/ui/Provider';

import client from '../apollo-client';
import AuthGuard from '../components/AuthGuard';
import { ColorModeProvider } from '../components/ui/color-mode';
import { wrapper } from '../redux/store';
import { saveUser } from '../redux/actions/auth';
import { NextPageWithAuth } from '../models/pageWithAuth';

interface MyAppProps extends AppProps {
  Component: NextPageWithAuth;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldGetPlayer, setShouldGetPlayer] = useState(true);

  useEffect(() => {
    if (shouldGetPlayer) {
      axios
        .get('/api/user/me')
        .then((res) => {
          if (res.data.player) {
            dispatch(saveUser(res.data.player, true));
          }
        })
        .catch(() => {})
        .finally(() => {
          setShouldGetPlayer(false);
          setIsLoading(false);
        });
    }
  }, [shouldGetPlayer, dispatch]);

  return (
    <ColorModeProvider>
      <ApolloProvider client={client}>
        <Provider>
          {Component.requireAuth ? (
            <AuthGuard isLoading={isLoading}>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </Provider>
      </ApolloProvider>
    </ColorModeProvider>
  );
};

const WrappedApp = (props: AppProps) => {
  const { store, props: wrappedProps } = wrapper.useWrappedStore(props);

  return (
    <ReduxProvider store={store}>
      <MyApp {...wrappedProps} />
    </ReduxProvider>
  );
};

export default appWithTranslation(WrappedApp);
