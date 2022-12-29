import { Track } from '@spotify-player/api';
import DataGrid from './DataGrid';

describe('<DataGrid />', () => {
  it('should render successfully', () => {
    const tracks: Track[] = [];
    cy.mount(<DataGrid tracks={tracks} onFav={() => {}} onPlay={() => {}} playingTrackId={null} />);
  });
});
