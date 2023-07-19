import { InputText, InputTextProps } from "primereact/inputtext"

interface Props extends InputTextProps {
    label: string,
    fullWidth?: boolean
}

export const TextField = (props: Props) => {
    const { label, fullWidth, ...inputTextProps } = props;
    return (
        <span className="p-float-label">
            <InputText
                id={label}
                {...inputTextProps}
                {...(fullWidth && { style: { width: '100%' } })}
            />
            <label htmlFor={label}>{label}</label>
        </span>
    )
}