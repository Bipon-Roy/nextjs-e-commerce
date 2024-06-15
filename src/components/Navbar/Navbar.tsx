import React from "react";
import NavUI from "./NavUI";
import { auth } from "@/auth";
import { fetchUserProfile, getCartItemsCount } from "@lib/dataFetching";

interface Profile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    verified: boolean;
}

interface NavbarProps {
    cartItemsCount: number;
    profile: Profile | null;
}

const Navbar = async () => {
    const session = await auth();

    let cartItemsCount = 0;
    let profile: Profile | null = null;

    if (session && session.user) {
        const userId = session.user.id;
        [cartItemsCount, profile] = await Promise.all([
            getCartItemsCount(userId),
            fetchUserProfile(userId),
        ]);
    }

    return (
        <div className="shadow-md">
            <NavUI cartItemsCount={cartItemsCount} avatar={profile?.avatar} />
        </div>
    );
};

export default Navbar;
