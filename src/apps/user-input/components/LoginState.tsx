import classes from '../styles/UserInput.module.scss';
import {useState} from "react";

export default function Login() {

    const [enteredValues, setEnteredValues] = useState({
        email: '',
        password: '',
    });

    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false,
    });

    const emailIsInvalid = didEdit.email
        && !enteredValues.email.includes('@');

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
                <div className={`${classes.control} ${classes.noMargin}`}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        onBlur={() => handleInputBlur('email')}
                        onChange={(event) =>
                            handleInputChange('email', event)}
                        value={enteredValues.email}
                    />
                    {/*<div className={classes.controlError}>*/}
                    {/*    <p>{emailIsInvalid ? 'Please enter a valid email address.' : ''}</p>*/}
                    {/*</div>*/}

                    <div className={classes.controlError}>
                        <p hidden={!emailIsInvalid}>Please enter a valid email address.</p>
                    </div>
                </div>

                <div className={`${classes.control} ${classes.noMargin}`}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        onBlur={() => handleInputBlur('password')}
                        onChange={(event) =>
                            handleInputChange('password', event)}
                        value={enteredValues.password}
                    />
                </div>
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
