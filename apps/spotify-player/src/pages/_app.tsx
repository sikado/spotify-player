import { AppProps } from 'next/app';
import Head from 'next/head';
import Player from '../components/organisms/Player/player';
import { client } from '../data-access/apollo-client';
import { ApolloProvider } from '@apollo/client';
import './styles.scss';
import { Track } from '@/generated-types';

function CustomApp({ Component, pageProps }: AppProps) {
  // const currentTrack: Track | null = null;
  const currentTrack: Track = {
    name: 'Track 1',
    artists: [{ name: 'Various Artists', id: '' }],
    album: {
      name: "La compile de l'été",
      id: '',
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d0000b2732beee88e97ca512ec5542fb8',
        },
      ],
    },
    href: '',
    duration_ms: 0,
    id: '',
  };

  return (
    <>
      <Head>
        <title>Spotify Player</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="app">
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          {currentTrack !== null ? <Player track={currentTrack} /> : null}
        </ApolloProvider>
      </main>
    </>
  );
}

export default CustomApp;
