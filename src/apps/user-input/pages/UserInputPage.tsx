import {useEffect} from "react";

import Header from '../components/Header';
import Login from '../components/Login';

import classes from '../styles/UserInput.module.scss';

function UserInputPage() {
    useEffect(() => {
        document.title = 'Beo Base | User Input';
    }, []);

    return (
        <div className={classes.page}>
            <Header />
            <main>
                <Login />
            </main>
        </div>
    );
}

export default UserInputPage;
