"use client";

import { Input } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { IoMdSearch } from "react-icons/io";

interface SearchFormProps {
    onSearch: (query: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="w-full md:w-72">
            <Input
                crossOrigin={undefined}
                label="Search"
                icon={
                    <button type="submit">
                        <IoMdSearch className="h-5 w-5" />
                    </button>
                }
                value={query}
                onChange={({ target }) => setQuery(target.value)}
            />
        </form>
    );
};

export default SearchForm;
