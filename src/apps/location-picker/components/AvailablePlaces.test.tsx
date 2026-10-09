import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import AvailablePlaces from './AvailablePlaces';

describe('AvailablePlaces', () => {
  it('renders the section title and the fallback text while there is no data', () => {
    render(<AvailablePlaces onSelectPlace={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'Available Places' })).toBeInTheDocument();
    expect(screen.getByText('No places available.')).toBeInTheDocument();
  });
});
