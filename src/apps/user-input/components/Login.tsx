import classes from '../styles/UserInput.module.scss';
import {useRef, useState} from "react";

export default function Login() {

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        console.log("Submit button clicked!");
        event.preventDefault();

        const enteredEmail = email.current?.value ?? '';
        const enteredPassword = password.current?.value ?? '';
        console.log('Entered email: ', enteredEmail);
        console.log('Entered password: ', enteredPassword);

        const emailIsValid = enteredEmail.includes('@');
        if (!emailIsValid) {
            setEmailIsInvalid(true);
            return;
        }

        setEmailIsInvalid(false);
        console.log('Mocking sending HTTPS request...');
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
                    <div className={classes.controlError}>
                        {emailIsInvalid && <p>
                            Please enter a valid email address.
                        </p>}
                    </div>
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
