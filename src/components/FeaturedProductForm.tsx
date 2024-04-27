"use client";

import {
    createFeaturedProduct,
    updateFeaturedProduct,
} from "@/app/(admin)/products/featured/action";
import { UpdateFeaturedProduct } from "@/types";
import { uploadImage } from "@/utils/helper";
import { Button, Input } from "@material-tailwind/react";
import Image from "next/image";
import React, { ChangeEventHandler, useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
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

// common validation schema
const commonFeaturedProductSchema = {
    title: Yup.string().required("Title is required"),
    link: Yup.string().required("Link is required"),
    linkTitle: Yup.string().required("Link title is required"),
};
// validation schema for add featured product image is required this time
const newFeaturedProductSchema = Yup.object().shape({
    file: Yup.mixed<File>()
        .required("File is required")
        .test("fileType", "Invalid file format. Only image files are allowed.", (value) => {
            if (value) {
                const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
                return supportedFormats.includes((value as File).type);
            }
            return true;
        }),
    ...commonFeaturedProductSchema,
});

// validation schema for update featured product image is optional this time
const oldFeaturedProductSchema = Yup.object().shape({
    file: Yup.mixed<File>().test(
        "fileType",
        "Invalid file format. Only image files are allowed.",
        (value) => {
            if (value) {
                const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
                return supportedFormats.includes((value as File).type);
            }
            return true;
        }
    ),
    ...commonFeaturedProductSchema,
});

const initialProduct = {
    title: "",
    link: "",
    linkTitle: "",
};

const FeaturedProductForm = ({ initialValue }: Props) => {
    const [isForUpdate, setIsForUpdate] = useState(false);
    const [featuredProduct, setFeaturedProduct] = useState<FeaturedProduct>(initialProduct);
    const [isPending, startTransition] = useTransition();
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

    // add featured product
    const handleCreate = async () => {
        try {
            const { file, link, linkTitle, title } = await newFeaturedProductSchema.validate(
                { ...featuredProduct },
                { abortEarly: false }
            );

            const banner = await uploadImage(file);
            await createFeaturedProduct({ banner, link, linkTitle, title });
            toast.success("Added Successfully");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                // console.log(error.inner);
                error.inner.map((err) => {
                    toast.error(err.message);
                });
            }
        }
    };

    const handleUpdate = async () => {
        try {
            const { file, link, linkTitle, title } = await oldFeaturedProductSchema.validate(
                { ...featuredProduct },
                { abortEarly: false }
            );

            const data: UpdateFeaturedProduct = {
                link,
                linkTitle,
                title,
            };

            if (file) {
                const banner = await uploadImage(file);
                data.banner = banner;
            }

            await updateFeaturedProduct(initialValue.id, data);
            toast.success("Update Successfully");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                // console.log(error.inner);
                error.inner.map((err) => {
                    toast.error(err.message);
                });
            }
        }
    };

    // handle submit operation whether it is create featured product or update
    const handleSubmit = async () => {
        if (isForUpdate) await handleUpdate();
        else await handleCreate();
    };

    return (
        <form
            action={() => startTransition(async () => await handleSubmit())}
            className="py-4 space-y-4"
        >
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
                    label="Link Title"
                    name="linkTitle"
                    value={linkTitle}
                    onChange={handleChange}
                />
            </div>
            <div className="text-right">
                <Button disabled={isPending} placeholder={undefined} type="submit">
                    {isForUpdate ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default FeaturedProductForm;
