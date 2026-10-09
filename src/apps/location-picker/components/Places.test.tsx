import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { BackendConfig } from '../../../components/config/BackendConfig.ts';

import Places, { type Place } from './Places';

const PLACES: Place[] = [
  { id: 'p1', title: 'Forest Waterfall', image: { src: 'forest.jpg', alt: 'A waterfall' } },
  { id: 'p2', title: 'Desert Dunes', image: { src: 'desert.jpg', alt: 'Golden dunes' } },
];

describe('Places', () => {
  it('renders the title', () => {
    render(
      <Places title="Available Places" places={[]} fallbackText="Nothing" onSelectPlace={vi.fn()} />
    );

    expect(screen.getByRole('heading', { name: 'Available Places' })).toBeInTheDocument();
  });

  it('shows the fallback text when there are no places', () => {
    render(
      <Places title="Mine" places={[]} fallbackText="Nothing here yet." onSelectPlace={vi.fn()} />
    );

    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders a list item with image and title for every place', () => {
    render(
      <Places title="Mine" places={PLACES} fallbackText="Nothing" onSelectPlace={vi.fn()} />
    );

    expect(screen.queryByText('Nothing')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('img', { name: 'A waterfall' })).toHaveAttribute(
      'src',
      `${BackendConfig.springApiUrl}/location-picker/images/forest.jpg`
    );
    expect(screen.getByRole('heading', { name: 'Desert Dunes' })).toBeInTheDocument();
  });

  it('calls onSelectPlace with the clicked place', () => {
    const onSelectPlace = vi.fn();
    render(
      <Places title="Mine" places={PLACES} fallbackText="Nothing" onSelectPlace={onSelectPlace} />
    );

    fireEvent.click(screen.getByRole('button', { name: /Desert Dunes/ }));

    expect(onSelectPlace).toHaveBeenCalledWith(PLACES[1]);
  });
});
