import SearchInput from './SearchInput';

describe('<SearchInput />', () => {
  it('should render successfully', () => {
    cy.mount(<SearchInput onChange={() => {}} />);
  });
});
