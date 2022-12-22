import { render } from '@testing-library/react';

import FetchPlaylist from './fetch-playlist';

describe('FetchPlaylist', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FetchPlaylist />);
    expect(baseElement).toBeTruthy();
  });
});
