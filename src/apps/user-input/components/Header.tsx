import logoImg from '../assets/logo.jpg';
import classes from '../styles/UserInput.module.scss';

export default function Header() {
    return (
        <header className={classes.header}>
            <img src={logoImg} alt="A form and a pencil" />
            <h1>React Forms</h1>
        </header>
    );
}
