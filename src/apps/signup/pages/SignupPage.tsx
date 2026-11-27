import { useEffect } from 'react';

import Header from '../components/Header';
import Signup from '../components/Signup';

import classes from '../styles/Signup.module.scss';

function SignupPage() {
  useEffect(() => {
    document.title = 'Beo Base | Signup';
  }, []);

  return (
    <div className={classes.page}>
      <Header />
      <main>
        <Signup />
      </main>
    </div>
  );
}

export default SignupPage;
