import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.scss';
import { Provider } from 'react-redux';
import { store } from 'src/state/store';
import { PlayerTemplate } from 'src/components/templates/player-template';
import { fetchOncePlaylist } from 'src/state/reducers';

store.dispatch(fetchOncePlaylist());

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Spotify Player</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="app">
        <Provider store={store}>
          <Component {...pageProps} />
          <PlayerTemplate />
        </Provider>
      </main>
    </>
  );
}

export default CustomApp;
