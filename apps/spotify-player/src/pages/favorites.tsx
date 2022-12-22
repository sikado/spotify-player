import Hero from '../components/molecules/Hero/hero';
import NavBar from '../components/molecules/NavBar/nav-bar';
import styles from './favorites.module.scss';

/* eslint-disable-next-line */
export interface FavoritesProps {}

export function Favorites(props: FavoritesProps) {
  return (
    <div className={styles['container']}>
      <Hero />
      <p>Empty table...</p>
      <NavBar />
    </div>
  );
}

export default Favorites;
