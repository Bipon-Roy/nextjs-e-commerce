import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const GridView = ({ children }: Props) => {
    return (
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {children}
        </div>
    );
};

export default GridView;
