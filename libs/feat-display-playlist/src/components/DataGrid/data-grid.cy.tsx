import { Track } from '@spotify-player/api';
import DataGrid from './data-grid';

describe('<DataGrid />', () => {
  it('should render successfully', () => {
    const tracks: (Track & { isLiked: boolean })[] = [];
    cy.mount(
      <DataGrid
        tracks={tracks}
        handleFav={() => {}}
        handlePlay={() => {}}
        playingTrackId={null}
      />
    );
  });
});
