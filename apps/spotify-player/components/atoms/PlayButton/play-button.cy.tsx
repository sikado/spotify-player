import React from 'react';
import PlayButton from './play-button';

describe('<PlayButton />', () => {
  it('should renders', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cy.mount(<PlayButton isPlaying={false} onClick={() => {}} />);
  });
  it('should display play icon on isPlaying == false', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cy.mount(<PlayButton isPlaying={false} onClick={() => {}} />);
    cy.get('button svg').should('have.class', 'bi-play-fill');
  });
  it('should display pause icon on isPlaying == true', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cy.mount(<PlayButton isPlaying={true} onClick={() => {}} />);
    cy.get('button svg').should('have.class', 'bi-pause-fill');
  });
  it('should fire a onClick event', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<PlayButton isPlaying={false} onClick={onClickSpy} />);
    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.called');
  });
});
