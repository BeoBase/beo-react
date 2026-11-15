import {useState} from "react";
import Input from './Input';

import {isEmail, isNotEmpty, hasMinLength} from '../utils/validation.ts';
import classes from '../styles/UserInput.module.scss';

export default function Login() {

    const [enteredValues, setEnteredValues] = useState({
        email: '',
        password: '',
    });

    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false,
    });

    const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
    const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Submit button clicked!");
        console.log('Entered email: ', enteredValues.email);
        console.log('Entered password: ', enteredValues.password);
    }

    function handleInputChange(identifier: 'email' | 'password', event: React.ChangeEvent<HTMLInputElement>) {
        setEnteredValues(prevValues => ({
            ...prevValues,
            [identifier]: event.target.value,
        }))

        setDidEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: false,
        }))
    }

    function handleInputBlur(identifier: 'email' | 'password') {
        setDidEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: true,
        }))
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
                    onBlur={() => handleInputBlur('email')}
                    onChange={(event) =>
                        handleInputChange('email', event)}
                    value={enteredValues.email}
                    error={emailIsInvalid ? 'Please enter a valid email.' : undefined}
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    onBlur={() => handleInputBlur('password')}
                    onChange={(event) =>
                        handleInputChange('password', event)}
                    value={enteredValues.password}
                    error={passwordIsInvalid ? 'Please enter a valid password.' : undefined}
                />
            </div>

            <div className={classes.formActions}>
                <button className={`${classes.button} ${classes.buttonFlat}`}>Reset</button>
                <button className={classes.button}>
                    Login
                </button>
            </div>
        </form>
    );
}
