/* eslint-disable camelcase */
import { LikedPlaylistTrack } from '@spotify-player/core';
import DataRow from './DataRow';

describe('<DataRow />', () => {
  it('should render successfully', () => {
    const playlistTrack: LikedPlaylistTrack = {
      added_at: '',
      track: {
        album: { name: '', id: '' },
        artists: [{ id: '', name: '' }],
        duration_ms: 0,
        id: '',
        name: '',
        preview_url: '',
        href: '',
        isLiked: true,
      },
    };
    cy.mount(<DataRow playlistTrack={playlistTrack} isPlaying={false} onFav={() => {}} onPlay={() => {}} />);
  });
});
