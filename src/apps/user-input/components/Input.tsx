import type { ComponentProps } from 'react';
import classes from "../styles/UserInput.module.scss";

interface InputProps extends ComponentProps<'input'> {
    label: string;
    id: string;
    error?: string;
}

export default function Input({label, id, error, ...props}: InputProps) {
    return (
        <div className={`${classes.control} ${classes.noMargin}`}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                {...props}
            />
            <div className={classes.controlError}>
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}