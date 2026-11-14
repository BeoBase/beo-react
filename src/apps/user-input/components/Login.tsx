import classes from '../styles/UserInput.module.scss';
import {useState} from "react";

export default function Login() {

    const [enteredEmail, setEnteredEmail] = useState('');

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Submitted!");
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEnteredEmail(event.currentTarget.value);
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
                        onChange={handleEmailChange}
                        value={enteredEmail}
                    />
                </div>

                <div className={`${classes.control} ${classes.noMargin}`}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" />
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
