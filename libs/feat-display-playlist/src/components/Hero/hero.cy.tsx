import { Playlist } from '@spotify-player/core';
import Hero from './Hero';

describe('<Hero />', () => {
  it('should render successfully', () => {
    const playlist: Playlist = {
      name: 'playlist name',
    };
    cy.mount(<Hero playlist={playlist} trackCount={0} totalDurationMs={0} onPlayAll={() => {}} />);
  });
});
