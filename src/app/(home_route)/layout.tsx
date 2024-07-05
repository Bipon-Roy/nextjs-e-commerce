import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const HomeLayout = async ({ children }: Props) => {
    return (
        <>
            {/* <Navbar /> */}
            <div className="max-w-7xl mx-auto px-4 xl:px-0 min-h-screen">{children}</div>
            <Footer />
        </>
    );
};

export default HomeLayout;
