import { Track } from '@spotify-player/api';
import DisplayPlaylist from './display-playlist';

describe('<DisplayPlaylist />', () => {
  it('should render successfully', () => {
    const playlist = { name: 'playlist' };
    const tracks: Track[] = [];
    cy.mount(
      <DisplayPlaylist
        tracks={tracks}
        playlist={playlist}
        playingTrackId={null}
        handleFav={() => {}}
        handlePlay={() => {}}
        handlePlayAll={() => {}}
      />
    );
  });
});
