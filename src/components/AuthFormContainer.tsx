import { FormEventHandler, ReactNode } from "react";

interface Props {
    children: ReactNode;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    title: string;
}

const AuthFormContainer = ({ title, children, onSubmit }: Props) => {
    return (
        <form onSubmit={onSubmit} className="w-96 p-6 space-y-5 bg-white shadow-md rounded-md">
            <h3 className="text-center font-semibold">{title}</h3>
            {children}
        </form>
    );
};

export default AuthFormContainer;
