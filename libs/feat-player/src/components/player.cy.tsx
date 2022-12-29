import { Track } from '@spotify-player/api';
import Player from './Player';

describe('<Player />', () => {
  it('should render successfully', () => {
    const track: Track = {
      added_at: '2013-03-10T02:00:00Z',
      album: { name: '' },
      artists: [''],
      duration_ms: 0,
      id: '',
      name: '',
      preview_url: '',
      isLiked: false,
    };
    cy.mount(
      <Player
        track={track}
        canSkipNext={false}
        canSkipPrev={false}
        onSkipNext={() => {}}
        onSkipPrev={() => {}}
      />
    );
  });
});
