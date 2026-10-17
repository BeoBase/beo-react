import classes from '../styles/UserInput.module.scss';

export default function Login() {
    return (
        <form className={classes.form}>
            <h2>Login</h2>

            <div className={classes.controlRow}>
                <div className={`${classes.control} ${classes.noMargin}`}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" />
                </div>

                <div className={`${classes.control} ${classes.noMargin}`}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" />
                </div>
            </div>

            <div className={classes.formActions}>
                <button type="reset" className={`${classes.button} ${classes.buttonFlat}`}>Reset</button>
                <button type="submit" className={classes.button}>Login</button>
            </div>
        </form>
    );
}
