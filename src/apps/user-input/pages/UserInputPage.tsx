import {useEffect} from "react";

import Header from '../components/Header';
// import Login from '../components/Login';
import SignUp from '../components/SignUp';

import classes from '../styles/UserInput.module.scss';

function UserInputPage() {
    useEffect(() => {
        document.title = 'Beo Base | User Input';
    }, []);

    return (
        <div className={classes.page}>
            <Header />
            <main>
                {/*<Login />*/}
                <SignUp />
            </main>
        </div>
    );
}

export default UserInputPage;
