import { Track } from '@spotify-player/api';
import DataRow from './data-row';

describe('<DataRow />', () => {
  it('should render successfully', () => {
    const track: Track = {
      added_at: '2013-03-10T02:00:00Z',
      album: { name: '' },
      artists: [''],
      duration_ms: 0,
      id: '',
      isLiked: false,
      name: '',
      preview_url: '',
    };
    cy.mount(
      <DataRow
        track={track}
        isPlaying={false}
        handleFav={() => {}}
        handlePlay={() => {}}
      />
    );
  });
});
