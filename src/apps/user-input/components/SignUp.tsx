import classes from '../styles/UserInput.module.scss';

export default function SignUp() {

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event?.preventDefault();

        // Browser provides this FormData
        const fd = new FormData(event.currentTarget);
        const data = {
            ...Object.fromEntries(fd.entries()),
            acquisition: fd.getAll('acquisition'),
        };
        console.log(data);
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
            </div>

            <div className={classes.controlRow}>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" required minLength={6} />
                </div>

                <div className={classes.control}>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                        required
                    />
                </div>
            </div>

            <hr />

            <div className={classes.controlRow}>
                <div className={classes.control}>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" required />
                </div>

                <div className={classes.control}>
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" required />
                </div>
            </div>

            <div className={classes.control}>
                <label htmlFor="role">What best describes your role?</label>
                <select id="role" name="role" required>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <fieldset>
                <legend>How did you find us?</legend>
                <div className={classes.control}>
                    <input
                        type="checkbox"
                        id="google"
                        name="acquisition"
                        value="google"
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className={classes.control}>
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className={classes.control}>
                    <input type="checkbox" id="other" name="acquisition" value="other" />
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className={classes.control}>
                <input type="checkbox" id="terms-and-conditions" name="terms" required />
                <label htmlFor="terms-and-conditions">
                    I agree to the terms and conditions
                </label>
            </div>

            <div className={classes.formActions}>
                <button type="reset" className={`${classes.button} ${classes.buttonFlat}`}>
                    Reset
                </button>
                <button type="submit" className={classes.button}>
                    Sign up
                </button>
            </div>
        </form>
    );
}
