import classes from '../styles/location-picker.module.scss';

interface ErrorMessageProps {
  title: string;
  message: string;
  onConfirm?: () => void;
}

export default function ErrorMessage({ title, message, onConfirm }: ErrorMessageProps) {
  return (
    <div className={classes.error}>
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div className={classes.confirmationActions}>
          <button onClick={onConfirm} className={classes.button}>
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
