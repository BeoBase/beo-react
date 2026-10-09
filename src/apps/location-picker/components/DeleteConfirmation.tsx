import { useEffect } from 'react';

import ProgressBar from './ProgressBar';

import classes from '../styles/location-picker.module.scss';

const TIMER = 3000;

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div className={classes.deleteConfirmation}>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div className={classes.confirmationActions}>
        <button onClick={onCancel} className={classes.buttonText}>
          No
        </button>
        <button onClick={onConfirm} className={classes.button}>
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
