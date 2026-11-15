import type {SyntheticEvent} from "react";
import Input from './Input';
import {useInput} from '../hooks/useInput.tsx';
import {isEmail, hasMinLength} from '../utils/validation.ts';
import classes from '../styles/UserInput.module.scss';

export default function Login() {

    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        reset: resetEmail,
        hasError: emailHasError,
        isValid: emailIsValid,
    } = useInput('', isEmail);

    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        reset: resetPassword,
        hasError: passwordHasError,
        isValid: passwordIsValid,
    } = useInput('', (value) => hasMinLength(value, 6));

    function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Submit button clicked!");
        console.log('Entered email: ', emailValue);
        console.log('Entered password: ', passwordValue);

        if (!emailIsValid || !passwordIsValid) {
            // Mark both fields as edited so their errors show up.
            handleEmailBlur();
            handlePasswordBlur();
            console.log('Invalid data');
            return;
        }

        console.log('Sending HTTPS request...');
    }

    function handleReset() {
        resetEmail();
        resetPassword();
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className={classes.controlRow}>
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    onBlur={handleEmailBlur}
                    onChange={handleEmailChange}
                    value={emailValue}
                    error={emailHasError ? 'Please enter a valid email.' : undefined}
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    onBlur={handlePasswordBlur}
                    onChange={handlePasswordChange}
                    value={passwordValue}
                    error={passwordHasError ? 'Please enter a valid password.' : undefined}
                />
            </div>

            <div className={classes.formActions}>
                <button
                    type="button"
                    className={`${classes.button} ${classes.buttonFlat}`}
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button type="submit" className={classes.button}>
                    Login
                </button>
            </div>
        </form>
    );
}
