import { render } from '@testing-library/react';

import DataRow from './data-row';

describe('DataRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataRow />);
    expect(baseElement).toBeTruthy();
  });
});
