import { Track } from '@spotify-player/core';
import Player from './Player';

describe('<Player />', () => {
  it('should render successfully', () => {
    const track: Track = {
      addedAt: '2013-03-10T02:00:00Z',
      album: { name: '' },
      artists: [''],
      durationMs: 0,
      id: '',
      name: '',
      previewUrl: '',
      isLiked: false,
    };
    cy.mount(
      <Player track={track} canSkipNext={false} canSkipPrev={false} onSkipNext={() => {}} onSkipPrev={() => {}} />
    );
  });
});
