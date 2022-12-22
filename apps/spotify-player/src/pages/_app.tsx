import { AppProps } from 'next/app';
import Head from 'next/head';
import Player from '../components/organisms/Player/player';
import { client } from '../data-access/apollo-client';
import { ApolloProvider } from '@apollo/client';
import './styles.scss';
import { Track } from '@/generated-types';

function CustomApp({ Component, pageProps }: AppProps) {
  const track: Track | null = null;

  return (
    <>
      <Head>
        <title>Spotify Player</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="app">
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          {track !== null ? <Player track={track} /> : null}
        </ApolloProvider>
      </main>
    </>
  );
}

export default CustomApp;
