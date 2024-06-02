"use client";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { TbDeviceWatch } from "react-icons/tb";
import { FaLongArrowAltRight, FaHeadphones } from "react-icons/fa";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FaLaptop } from "react-icons/fa";
import categories from "@/utils/ProductCategories";
import SectionHeading from "./SectionHeading";

const ProductMenu = () => {
    return (
        <>
            <SectionHeading title="Product" subTitle="Categories" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((c) => (
                    <Card key={c} placeholder={undefined} className="border shadow-none">
                        <CardBody
                            placeholder={undefined}
                            className="space-y-2 flex flex-col justify-center items-center"
                        >
                            {c === "Phone" && (
                                <IoPhonePortraitOutline className="w-12 h-12 text-orange-400" />
                            )}
                            {c === "Watch" && (
                                <TbDeviceWatch className="w-12 h-12 text-orange-400" />
                            )}
                            {c === "Laptop" && <FaLaptop className="w-12 h-12 text-orange-400" />}
                            {c === "Headphones" && (
                                <FaHeadphones className="w-12 h-12 text-orange-400" />
                            )}
                            <Typography
                                placeholder={undefined}
                                variant="h5"
                                color="blue-gray"
                                className="text-center text-base md:text-lg"
                            >
                                {c}
                            </Typography>
                            <Link className="px-4 py-1 rounded-md" href={`/browse-products/${c}`}>
                                <div className="flex items-center gap-1 md:gap-2 text-blue-400 font-semibold text-xs md:text-sm">
                                    View Products
                                    <FaLongArrowAltRight className="h-4 w-4 md:h-6 md:w-6 " />
                                </div>
                            </Link>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default ProductMenu;
