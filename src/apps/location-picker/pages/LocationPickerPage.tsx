import {useCallback, useEffect, useRef, useState} from 'react';

import Places, { type Place } from '../components/Places';
import Modal from '../components/Modal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import AvailablePlaces from '../components/AvailablePlaces';
import ErrorMessage from "../components/ErrorMessage.tsx";

import {fetchUserPlaces} from "../http.ts";
import {useFetch} from "../hooks/useFetch.ts";

import logoImg from '../assets/logo.png';
import classes from '../styles/location-picker.module.scss';

export default function LocationPickerPage() {

  useEffect(() => {
    document.title = 'Beo Base | Location Picker';
  }, []);

  const selectedPlace = useRef<Place | null>(null);

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState<{ message: string } | null>(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {isFetching, error, fetchedData: userPlaces} = useFetch(fetchUserPlaces, []);

  function handleStartRemovePlace(place: Place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // This is optimistic updating and roll back if updating API failed
  async function handleSelectPlace() {
    // setUserPlaces((prevPickedPlaces) => {
    //   if (prevPickedPlaces.some((p) => p.id === place.id)) {
    //     return prevPickedPlaces;
    //   }
    //   return [place, ...prevPickedPlaces];
    // });
    //
    // try {
    //   await updateUserPlaces([place, ...userPlaces]);
    // } catch (error) {
    //   console.error(error);
    //   setErrorUpdatingPlaces({
    //     message: error instanceof Error ? error.message : 'Failed to update places',
    //   });
    //   setUserPlaces(userPlaces);
    // }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    // setUserPlaces((prevPickedPlaces) =>
    //   prevPickedPlaces.filter((place) => place.id !== selectedPlace.current?.id)
    // );
    //
    // try {
    //   await updateUserPlaces(
    //     userPlaces.filter(place => place.id !== selectedPlace.current?.id));
    // } catch (error) {
    //   setUserPlaces(userPlaces);
    //   setErrorUpdatingPlaces({
    //     message: error instanceof Error ? error.message : 'Failed to remove places',
    //   });
    // }

    setModalIsOpen(false);
  }, [userPlaces]);

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <div className={classes.page}>

      <Modal open={!!errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorMessage
            title="An error occured!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

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
        {error && <ErrorMessage
          title="An error occured!"
          message={error.message}
        />}
        {!error && <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
          isLoading={isFetching}
          loadingText="Fetch user places..."
        />}

        <AvailablePlaces
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </div>
  );
}
