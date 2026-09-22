
import logoImg from '../assets/quiz-logo.png';

export default function Header() {
    return <>
        <header className="text-center">
            <img
              src={logoImg}
              alt="Quiz Logo"
              className="mx-auto w-16 h-16"
            />
            <h1 className="text-4xl font-bold">
                React Quiz
            </h1>
        </header>
    </>
}