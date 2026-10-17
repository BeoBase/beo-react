import {useEffect} from "react";

import Header from '../components/Header';
import Login from '../components/Login';

function UserInputPage() {
    useEffect(() => {
        document.title = 'Beo Base | User Input';
    }, []);

    return <>
        <Header />
        <main>
            <Login />
        </main>
    </>;
}

export default UserInputPage;