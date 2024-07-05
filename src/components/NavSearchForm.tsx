"use client";

import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    submitTo: string;
}

const NavSearchForm = ({ submitTo }: Props) => {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const params = useSearchParams();
    const searchQuery = params.get("query") || "";

    useEffect(() => {
        setQuery(searchQuery);
    }, [searchQuery]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (!query) return;
                router.push(`${submitTo}${query}`);
            }}
            className="w-full flex items-center bg-white border rounded border-gray-300"
        >
            <input
                type="text"
                placeholder="Search Product"
                className="flex-grow p-2 pl-4 focus:outline-none rounded w-full"
                value={query}
                onChange={({ target }) => setQuery(target.value)}
            />
            <button type="submit" className="p-2">
                <IoMdSearch className="h-5 w-5" />
            </button>
        </form>
    );
};

export default NavSearchForm;
