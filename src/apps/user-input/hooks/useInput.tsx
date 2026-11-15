import {useState, type ChangeEvent} from "react";

export function useInput(
    defaultValue: string,
    validationFn: (value: string) => boolean
) {

    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true);
    }

    function reset() {
        setEnteredValue(defaultValue);
        setDidEdit(false);
    }

    return {
        value: enteredValue,
        handleInputChange,
        handleInputBlur,
        reset,
        // Whether to show an error: only once the user has left the field.
        hasError: didEdit && !valueIsValid,
        // Whether the current value is valid, regardless of whether it was edited.
        isValid: valueIsValid,
    };
}
