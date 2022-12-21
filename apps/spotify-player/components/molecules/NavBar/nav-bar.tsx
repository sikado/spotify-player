import Link from 'next/link';
import styles from './nav-bar.module.scss';

/* eslint-disable-next-line */
export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  return (
    <nav className={styles['container']}>
      <div className="nav-item">
        <Link href="/">Playlist</Link>
      </div>
      <div className="nav-item">
        <Link href="/favorites">Likes</Link>
      </div>
    </nav>
  );
}

export default NavBar;
