import FetchPlaylist from '../components/organisms/Playlist/fetch-playlist';
import { ClientOnly } from '../utils/ClientOnly';
import Hero from '../components/molecules/Hero/hero';
import NavBar from '../components/molecules/NavBar/nav-bar';
import styles from './index.module.scss';

export function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <Hero />
          <ClientOnly>
            <FetchPlaylist />
          </ClientOnly>
          <NavBar />
        </div>
      </div>
    </div>
  );
}

export default Index;
