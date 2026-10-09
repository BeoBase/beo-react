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
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ places: PLACES }) });
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it('renders the section title and the loading text before the places arrive', async () => {
    render(<AvailablePlaces onSelectPlace={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'Available Places' })).toBeInTheDocument();
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
    expect(screen.queryByText('No places available.')).not.toBeInTheDocument();

    await screen.findAllByRole('listitem');

    expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
  });

  it('shows the fallback text when the backend returns no places', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ places: [] }) });

    render(<AvailablePlaces onSelectPlace={vi.fn()} />);

    expect(await screen.findByText('No places available.')).toBeInTheDocument();
    expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
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

  it('shows an error message when the backend answers with an error status', async () => {
    fetchMock.mockResolvedValue({ ok: false, json: async () => ({}) });

    render(<AvailablePlaces onSelectPlace={vi.fn()} />);

    expect(await screen.findByText('An error occurred!')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch locations')).toBeInTheDocument();
    expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
  });

  it('shows the error message when the request itself fails', async () => {
    fetchMock.mockRejectedValue(new Error('Network down'));

    render(<AvailablePlaces onSelectPlace={vi.fn()} />);

    expect(await screen.findByText('An error occurred!')).toBeInTheDocument();
    expect(screen.getByText('Network down')).toBeInTheDocument();
  });

  it('falls back to a generic message when something other than an Error is thrown', async () => {
    fetchMock.mockRejectedValue('boom');

    render(<AvailablePlaces onSelectPlace={vi.fn()} />);

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });
});
