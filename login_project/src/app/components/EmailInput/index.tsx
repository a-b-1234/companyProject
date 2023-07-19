import { InputTextProps } from "primereact/inputtext";
import { useState } from "react";
import { TextField } from "../TextField";

interface Props extends InputTextProps {
    label: string,
    fullWidth?: boolean,
    setValue: (e) => void
}

export const EmailInput = ({ label, value, setValue }: Props) => {
    const [error, setError] = useState('');

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleChange = event => {
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError('');
        }
        setValue(event.target.value);
    };

    return (
        <div>
            <TextField
                label={label}
                id="email"
                name="email"
                value={value}
                onChange={handleChange}
            />

            {error && <h2 style={{ color: 'red' }}>{error}</h2>}
        </div>
    );
}