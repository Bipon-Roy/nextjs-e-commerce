import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const FormLayout = ({ children }: Props) => {
    return <div className="h-[80vh] flex justify-center items-center">{children}</div>;
};

export default FormLayout;
