import { Track } from 'src/services/playlist';
import SmallTrackDisplay from './small-track-display';

describe('<SmallTrackDisplay />', () => {
  const track: Track = {
    name: 'Track 1',
    artists: ['Various Artists'],
    album: { name: "La compile de l'été" },
    preview_url: '',
    id: '',
    added_at: '',
  };

  it('should render successfully', () => {
    cy.mount(<SmallTrackDisplay track={track} />);
  });

  it.skip('should display the album cover', () => {
    const customTrack = {
      ...track,
      album: {
        ...track.album,
        imageUrl:
          'https://i.scdn.co/image/ab67616d0000b2732beee88e97ca512ec5542fb8',
      },
    };

    console.log(customTrack);

    cy.mount(<SmallTrackDisplay track={customTrack} />);
    cy.get('[data-cy="cover"]').should(
      'have.attr',
      'src',
      customTrack.album.imageUrl
    );
  });
});
