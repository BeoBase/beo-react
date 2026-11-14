import classes from '../styles/UserInput.module.scss';

export default function Login() {

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Submitted!");
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
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
                <button className={`${classes.button} ${classes.buttonFlat}`}>Reset</button>
                <button className={classes.button} onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </form>
    );
}
