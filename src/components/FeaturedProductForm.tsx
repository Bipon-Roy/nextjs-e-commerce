"use client";

import { Button, Input } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import * as Yup from "yup";

export interface FeaturedProduct {
    file?: File;
    title: string;
    link: string;
    linkTitle: string;
}

interface Props {
    initialValue?: any;
}

const initialProduct = {
    title: "",
    link: "",
    linkTitle: "",
};

const FeaturedProductForm = ({ initialValue }: Props) => {
    const [isForUpdate, setIsForUpdate] = useState(false);
    const [featuredProduct, setFeaturedProduct] = useState<FeaturedProduct>(initialProduct);

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value, files } = target;

        if (name === "file" && files) {
            const file = files[0];
            if (file) setFeaturedProduct({ ...featuredProduct, file });
        } else setFeaturedProduct({ ...featuredProduct, [name]: value });
    };

    useEffect(() => {
        if (initialValue) {
            setFeaturedProduct({ ...initialValue });
            setIsForUpdate(true);
        }
    }, [initialValue]);

    const poster = featuredProduct.file
        ? URL.createObjectURL(featuredProduct.file)
        : initialValue?.banner || "";

    const { link, linkTitle, title } = featuredProduct;

    return (
        <form className="py-4 space-y-4">
            <label htmlFor="banner-file">
                <input
                    type="file"
                    accept="image/*"
                    id="banner-file"
                    name="file"
                    onChange={handleChange}
                    hidden
                />
                <div className="h-[380px] w-full flex flex-col items-center justify-center border border-dashed border-blue-gray-400 rounded cursor-pointer relative">
                    {poster ? (
                        <Image alt="banner" src={poster || initialValue?.banner} fill />
                    ) : (
                        <>
                            <span>Select Banner</span>
                            <span>1140 x 380</span>
                        </>
                    )}
                </div>
            </label>
            <Input
                crossOrigin={undefined}
                label="Title"
                name="title"
                value={title}
                onChange={handleChange}
            />
            <div className="flex space-x-4">
                <Input
                    crossOrigin={undefined}
                    label="Link"
                    name="link"
                    value={link}
                    onChange={handleChange}
                />
                <Input
                    crossOrigin={undefined}
                    label="Lik Title"
                    name="linkTitle"
                    value={linkTitle}
                    onChange={handleChange}
                />
            </div>
            <div className="text-right">
                <Button placeholder={undefined} type="submit">
                    {isForUpdate ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default FeaturedProductForm;
