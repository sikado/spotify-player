import { Playlist } from '@spotify-player/api';
import Hero from './Hero';

describe('<Hero />', () => {
  it('should render successfully', () => {
    const playlist: Playlist = {
      name: 'playlist name',
    };
    cy.mount(
      <Hero
        playlist={playlist}
        trackCount={0}
        totalDuration_ms={0}
        onPlayAll={() => {}}
      />
    );
  });
});
