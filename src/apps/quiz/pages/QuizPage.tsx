import {useEffect} from "react";
import Header from '../components/Header.tsx'
import Quiz from '../components/Quiz.tsx';

export default function QuizPage() {
    useEffect(() => {
        document.title = "Beo Base | Quiz";
    }, []);

    return (
        <>
            <Header />
            <Quiz />
        </>
    );
}