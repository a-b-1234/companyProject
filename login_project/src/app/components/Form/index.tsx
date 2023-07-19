interface Props {
    onSubmit: (e) => void;
    children: React.ReactNode[]
}
export const Form = ({ onSubmit, children }: Props) => {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    )
}