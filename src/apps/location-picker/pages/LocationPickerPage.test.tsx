import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LocationPickerPage from './LocationPickerPage';
import type { Place } from '../components/Places';

const PLACE: Place = {
  id: 'p1',
  title: 'Forest Waterfall',
  image: { src: 'forest.jpg', alt: 'A waterfall' },
};

// There is no data source yet, so stand in for AvailablePlaces with a button that picks a place.
vi.mock('../components/AvailablePlaces', () => ({
  default: ({ onSelectPlace }: { onSelectPlace: (place: Place) => void }) => (
    <button onClick={() => onSelectPlace(PLACE)}>Pick place</button>
  ),
}));

describe('LocationPickerPage', () => {
  beforeEach(() => {
    // jsdom has no real <dialog> support, so mimic open/close via the `open` attribute.
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
    });
  });

  it('sets the document title', () => {
    render(<LocationPickerPage />);

    expect(document.title).toBe('Beo Base | Location Picker');
  });

  it('renders the header and the empty personal collection', () => {
    render(<LocationPickerPage />);

    expect(screen.getByRole('heading', { name: 'PlacePicker' })).toBeInTheDocument();
    expect(
      screen.getByText('Select the places you would like to visit below.')
    ).toBeInTheDocument();
  });

  it('adds a picked place to the collection only once', () => {
    render(<LocationPickerPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Pick place' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pick place' }));

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Forest Waterfall' })).toBeInTheDocument();
  });

  it('opens the confirmation modal when a collected place is clicked', () => {
    render(<LocationPickerPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Pick place' }));

    fireEvent.click(screen.getByRole('button', { name: /Forest Waterfall/ }));

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('removes the place when the removal is confirmed', () => {
    render(<LocationPickerPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Pick place' }));
    fireEvent.click(screen.getByRole('button', { name: /Forest Waterfall/ }));

    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });

  it('keeps the place when the removal is cancelled', () => {
    render(<LocationPickerPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Pick place' }));
    fireEvent.click(screen.getByRole('button', { name: /Forest Waterfall/ }));

    fireEvent.click(screen.getByRole('button', { name: 'No' }));

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });
});
