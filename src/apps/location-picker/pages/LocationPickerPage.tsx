import { useEffect, useRef, useState, useCallback } from 'react';

import Places, { type Place } from '../components/Places';
import Modal from '../components/Modal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import AvailablePlaces from '../components/AvailablePlaces';
import logoImg from '../assets/logo.png';

import {updateUserPlaces} from "../http.ts";
import classes from '../styles/location-picker.module.scss';

export default function LocationPickerPage() {
  useEffect(() => {
    document.title = 'Beo Base | Location Picker';
  }, []);

  const selectedPlace = useRef<Place | null>(null);

  const [userPlaces, setUserPlaces] = useState<Place[]>([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place: Place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(place: Place) {
    setUserPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((p) => p.id === place.id)) {
        return prevPickedPlaces;
      }
      return [place, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([place, ...userPlaces]);
    } catch (error) {
      console.error(error);
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current?.id)
    );

    setModalIsOpen(false);
  }, []);

  return (
    <div className={classes.page}>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header className={classes.header}>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </div>
  );
}
