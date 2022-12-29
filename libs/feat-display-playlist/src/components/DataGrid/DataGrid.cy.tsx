import { Track } from '@spotify-player/core';
import DataGrid from './DataGrid';

describe('<DataGrid />', () => {
  it('should render successfully', () => {
    const tracks: Track[] = [];
    cy.mount(<DataGrid tracks={tracks} onFav={() => {}} onPlay={() => {}} playingTrackId={null} />);
  });
});
