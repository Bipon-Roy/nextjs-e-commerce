import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const GridContainer = ({ children }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {children}
        </div>
    );
};

export default GridContainer;
