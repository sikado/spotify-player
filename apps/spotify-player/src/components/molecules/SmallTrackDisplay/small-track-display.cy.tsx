import { Track } from '@/generated-types';
import SmallTrackDisplay from './small-track-display';

describe('<SmallTrackDisplay />', () => {
  const track: Track = {
    name: 'Track 1',
    artists: [{ name: 'Various Artists', id: '' }],
    album: { name: "La compile de l'été", id: '' },
    href: '',
    duration_ms: 0,
    id: '',
  };

  it('should render successfully', () => {
    cy.mount(<SmallTrackDisplay track={track} />);
  });

  it.skip('should display the album cover', () => {
    const customTrack = {
      ...track,
      album: {
        ...track.album!,
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d0000b2732beee88e97ca512ec5542fb8',
          },
        ],
      },
    };

    console.log(customTrack);

    cy.mount(<SmallTrackDisplay track={customTrack} />);
    cy.get('[data-cy="cover"]').should(
      'have.attr',
      'src',
      customTrack.album!.images![0]!.url
    );
  });
});
