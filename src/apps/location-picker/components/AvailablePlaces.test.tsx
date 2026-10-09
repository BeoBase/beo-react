import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { BackendConfig } from '../../../components/config/BackendConfig.ts';

import AvailablePlaces from './AvailablePlaces';

const PLACES = [
  { id: 'p1', title: 'Forest Waterfall', image: { src: 'forest.jpg', alt: 'A waterfall' } },
  { id: 'p2', title: 'Desert Dunes', image: { src: 'desert.jpg', alt: 'Golden dunes' } },
];

describe('AvailablePlaces', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    // Never hit a real backend in unit tests
    fetchMock.mockResolvedValue({ json: async () => ({ places: PLACES }) });
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it('renders the section title and the fallback text before the places arrive', async () => {
    render(<AvailablePlaces onSelectPlace={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'Available Places' })).toBeInTheDocument();
    expect(screen.getByText('No places available.')).toBeInTheDocument();

    await screen.findAllByRole('listitem');
  });

  it('fetches the places from the backend', async () => {
    render(<AvailablePlaces onSelectPlace={vi.fn()} />);

    await screen.findAllByRole('listitem');

    expect(fetchMock).toHaveBeenCalledWith(`${BackendConfig.springApiUrl}/location-picker/places`);
  });

  it('renders the fetched places', async () => {
    render(<AvailablePlaces onSelectPlace={vi.fn()} />);

    expect(await screen.findAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Forest Waterfall' })).toBeInTheDocument();
    expect(screen.queryByText('No places available.')).not.toBeInTheDocument();
  });

  it('calls onSelectPlace with the clicked place', async () => {
    const onSelectPlace = vi.fn();
    render(<AvailablePlaces onSelectPlace={onSelectPlace} />);

    fireEvent.click(await screen.findByRole('button', { name: /Desert Dunes/ }));

    expect(onSelectPlace).toHaveBeenCalledWith(PLACES[1]);
  });
});
