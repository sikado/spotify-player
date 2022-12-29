import Hero from './hero';

describe('<Hero />', () => {
  it('should render successfully', () => {
    cy.mount(
      <Hero
        name={'playlist'}
        trackCount={0}
        totalDuration_ms={0}
        handlePlayAll={() => {}}
      />
    );
  });
});
