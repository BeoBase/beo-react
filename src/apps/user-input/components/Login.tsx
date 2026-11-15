import classes from '../styles/UserInput.module.scss';
import {useRef} from "react";

export default function Login() {

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const enteredEmail = email.current?.value ?? '';
        const enteredPassword = password.current?.value ?? '';

        console.log("Submit button clicked!");
        console.log('Entered email: ', enteredEmail);
        console.log('Entered password: ', enteredPassword);
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
                        ref={email}
                    />
                </div>

                <div className={`${classes.control} ${classes.noMargin}`}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        ref={password}
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
