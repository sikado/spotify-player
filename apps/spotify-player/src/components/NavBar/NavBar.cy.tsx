import NavBar from './NavBar';

describe('<NavBar />', () => {
  it('should render successfully', () => {
    cy.mount(<NavBar />);
  });
});
