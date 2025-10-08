import { ApolloProvider } from '@apollo/client';
import { Provider } from '../components/ui/Provider';
import axios from 'axios';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import client from '../apollo-client';
import AuthGuard from '../components/AuthGuard';
import { defaultScores } from '../constants/game';
import { NextPageWithAuth } from '../models/pageWithAuth';
import { saveUser } from '../redux/actions/auth';
import { setFirstPlayer } from '../redux/actions/newGame';
import { wrapper } from '../redux/store';
import { ColorModeProvider } from '../components/ui/color-mode';

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
            const { id, name, avatar } = res.data.player;
            dispatch(setFirstPlayer({ id, name, avatar, isRegistered: true, scores: defaultScores }));

            setShouldGetPlayer(false);
          }
        })
        .catch(() => {
          setShouldGetPlayer(false);
        })
        .finally(() => setIsLoading(false));
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

export default wrapper.withRedux(appWithTranslation(MyApp));
