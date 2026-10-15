import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LocationPickerPage from './LocationPickerPage';
import type { Place } from '../components/Places';
import { fetchUserPlaces, updateUserPlaces } from '../http';

const PLACE: Place = {
  id: 'p1',
  title: 'Forest Waterfall',
  image: { src: 'forest.jpg', alt: 'A waterfall' },
};

const FALLBACK_TEXT = 'Select the places you would like to visit below.';

vi.mock('../http', () => ({
  fetchUserPlaces: vi.fn(),
  updateUserPlaces: vi.fn(),
}));

// There is no data source yet, so stand in for AvailablePlaces with a button that picks a place.
vi.mock('../components/AvailablePlaces', () => ({
  default: ({ onSelectPlace }: { onSelectPlace: (place: Place) => void }) => (
    <button onClick={() => onSelectPlace(PLACE)}>Pick place</button>
  ),
}));

describe('LocationPickerPage', () => {
  beforeEach(() => {
    vi.mocked(fetchUserPlaces).mockResolvedValue([]);
    vi.mocked(updateUserPlaces).mockResolvedValue([]);
    // jsdom has no real <dialog> support, so mimic open/close via the `open` attribute.
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
    });
  });

  it('sets the document title', async () => {
    render(<LocationPickerPage />);
    await screen.findByText(FALLBACK_TEXT);

    expect(document.title).toBe('Beo Base | Location Picker');
  });

  it('renders the header and the empty personal collection', async () => {
    render(<LocationPickerPage />);

    expect(screen.getByRole('heading', { name: 'PlacePicker' })).toBeInTheDocument();
    expect(await screen.findByText(FALLBACK_TEXT)).toBeInTheDocument();
  });

  it('shows the places saved by the user once they are fetched', async () => {
    vi.mocked(fetchUserPlaces).mockResolvedValue([PLACE]);

    render(<LocationPickerPage />);

    expect(await screen.findByRole('heading', { name: 'Forest Waterfall' })).toBeInTheDocument();
  });

  it('shows an error message when the user places cannot be fetched', async () => {
    vi.mocked(fetchUserPlaces).mockRejectedValue(new Error('boom'));

    render(<LocationPickerPage />);

    expect(await screen.findByText('boom')).toBeInTheDocument();
  });

  it('adds a picked place to the collection only once', async () => {
    render(<LocationPickerPage />);
    await screen.findByText(FALLBACK_TEXT);

    fireEvent.click(screen.getByRole('button', { name: 'Pick place' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pick place' }));

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Forest Waterfall' })).toBeInTheDocument();
  });

  it('opens the confirmation modal when a collected place is clicked', async () => {
    render(<LocationPickerPage />);
    await screen.findByText(FALLBACK_TEXT);
    fireEvent.click(screen.getByRole('button', { name: 'Pick place' }));

    fireEvent.click(screen.getByRole('button', { name: /Forest Waterfall/ }));

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('removes the place when the removal is confirmed', async () => {
    render(<LocationPickerPage />);
    await screen.findByText(FALLBACK_TEXT);
    fireEvent.click(screen.getByRole('button', { name: 'Pick place' }));
    fireEvent.click(screen.getByRole('button', { name: /Forest Waterfall/ }));

    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));

    await waitFor(() => {
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
      expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
    });
  });

  it('keeps the place when the removal is cancelled', async () => {
    render(<LocationPickerPage />);
    await screen.findByText(FALLBACK_TEXT);
    fireEvent.click(screen.getByRole('button', { name: 'Pick place' }));
    fireEvent.click(screen.getByRole('button', { name: /Forest Waterfall/ }));

    fireEvent.click(screen.getByRole('button', { name: 'No' }));

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });
});
