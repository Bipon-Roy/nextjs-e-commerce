import { signOut } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const SignOutBtn = ({ children }: Props) => {
    return <div onClick={async () => await signOut()}>{children}</div>;
};

export default SignOutBtn;
