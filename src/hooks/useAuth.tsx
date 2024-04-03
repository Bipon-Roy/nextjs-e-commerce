import { SessionUserProfile } from "@/types";
import { useSession } from "next-auth/react";

interface Auth {
    loading: boolean;
    loggedIn: boolean;
    isAdmin: boolean;
    profile?: SessionUserProfile | null;
}
const useAuth = (): Auth => {
    const session = useSession();
    return {
        loading: session.status === "loading",
        loggedIn: session.status === "authenticated",
        isAdmin: false,
    };
};

export default useAuth;
