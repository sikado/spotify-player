import { Track } from '@spotify-player/api';
import DataRow from './DataRow';

describe('<DataRow />', () => {
  it('should render successfully', () => {
    const track: Track = {
      addedAt: '2013-03-10T02:00:00Z',
      album: { name: '' },
      artists: [''],
      durationMs: 0,
      id: '',
      isLiked: false,
      name: '',
      previewUrl: '',
    };
    cy.mount(<DataRow track={track} isPlaying={false} onFav={() => {}} onPlay={() => {}} />);
  });
});
