import classes from '../styles/Signup.module.scss';

export default function Signup() {
  return (
    <form className={classes.form}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className={classes.control}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className={classes.controlRow}>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className={classes.control}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input id="confirm-password" type="password" name="confirm-password" />
        </div>
      </div>

      <hr />

      <div className={classes.controlRow}>
        <div className={classes.control}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className={classes.control}>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className={classes.control}>
        <label htmlFor="role">What best describes your role?</label>
        <select id="role" name="role">
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
          <input type="checkbox" id="google" name="acquisition" value="google" />
          <label htmlFor="google">Google</label>
        </div>

        <div className={classes.control}>
          <input type="checkbox" id="friend" name="acquisition" value="friend" />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className={classes.control}>
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className={classes.control}>
        <input type="checkbox" id="terms-and-conditions" name="terms" />
        <label htmlFor="terms-and-conditions">I agree to the terms and conditions</label>
      </div>

      <p className={classes.formActions}>
        <button type="reset" className={`${classes.button} ${classes.buttonFlat}`}>
          Reset
        </button>
        <button type="submit" className={classes.button}>
          Sign up
        </button>
      </p>
    </form>
  );
}
