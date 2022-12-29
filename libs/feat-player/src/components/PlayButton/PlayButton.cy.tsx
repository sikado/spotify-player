import PlayButton from './PlayButton';

describe('<PlayButton />', () => {
  const buttonSelector = '[data-cy="play"]';

  it('should renders', () => {
    cy.mount(<PlayButton isPlaying={false} onClick={() => {}} />);
  });
  it('should display play icon on isPlaying == false', () => {
    cy.mount(<PlayButton isPlaying={false} onClick={() => {}} />);
    cy.get(`${buttonSelector} svg`).should('have.class', 'bi-play-fill');
  });
  it('should display pause icon on isPlaying == true', () => {
    cy.mount(<PlayButton isPlaying onClick={() => {}} />);
    cy.get(`${buttonSelector} svg`).should('have.class', 'bi-pause-fill');
  });
  it('should fire a onClick event', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<PlayButton isPlaying={false} onClick={onClickSpy} />);
    cy.get(buttonSelector).click();
    cy.get('@onClickSpy').should('have.been.called');
  });
});
