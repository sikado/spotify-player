import { Track } from '@spotify-player/core';
import DisplayPlaylist from './DisplayPlaylist';

describe('<DisplayPlaylist />', () => {
  it('should render successfully', () => {
    const playlist = { name: 'playlist' };
    const tracks: Track[] = [];
    cy.mount(
      <DisplayPlaylist
        tracks={tracks}
        playlist={playlist}
        playingTrackId={null}
        onFav={() => {}}
        onPlay={() => {}}
        onPlayAll={() => {}}
      />
    );
  });
});
