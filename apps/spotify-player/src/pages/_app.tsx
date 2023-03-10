import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Layout from '../components/Layout/Layout';
import { store } from '../state/store';
import './styles.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Spotify Player</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default CustomApp;
