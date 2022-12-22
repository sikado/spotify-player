import SkipButton from './skip-button';

describe('<SkipButton />', () => {
  const buttonSelector = '[data-cy="button"]';

  it('should render successfully', () => {
    cy.mount(<SkipButton direction="prev" canSkip={true} onClick={() => {}} />);
  });
  it('should point right on direction == next', () => {
    cy.mount(<SkipButton direction="next" canSkip={true} onClick={() => {}} />);
    cy.get(`${buttonSelector} svg`).should('have.class', 'bi-skip-end-fill');
  });
  it('should point left on direction == prev', () => {
    cy.mount(<SkipButton direction="prev" canSkip={true} onClick={() => {}} />);
    cy.get(`${buttonSelector} svg`).should('have.class', 'bi-skip-start-fill');
  });

  it('should not be disabled if it can skip', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(
      <SkipButton direction="prev" canSkip={true} onClick={onClickSpy} />
    );
    cy.get(buttonSelector).should('not.have.attr', 'disabled');

    cy.get(buttonSelector).click();
    cy.get('@onClickSpy').should('have.been.called');
  });

  it("should be disabled if it can't skip", () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(
      <SkipButton direction="prev" canSkip={false} onClick={onClickSpy} />
    );
    cy.get(buttonSelector).should('have.attr', 'disabled');
    cy.get(buttonSelector).click({ force: true });
    cy.get('@onClickSpy').should('not.have.been.called');
  });
});
