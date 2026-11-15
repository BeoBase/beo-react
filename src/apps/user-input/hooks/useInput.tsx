import {useState, type ChangeEvent} from "react";

export function useInput(defaultValue: string) {

    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true);
    }

    return {
        value: enteredValue,
        handleInputChange,
        handleInputBlur,
    };
}