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
                    <Card key={c} placeholder={undefined} className="border shadow-none ">
                        <CardBody
                            placeholder={undefined}
                            className="space-y-2 flex flex-col justify-center items-center px-1 py-4 md:py-6"
                        >
                            {c === "Phone" && (
                                <IoPhonePortraitOutline className="w-10 h-10 md:w-12 md:h-12 text-orange-400" />
                            )}
                            {c === "Watch" && (
                                <TbDeviceWatch className="w-10 h-10 md:w-12 md:h-12 text-orange-400" />
                            )}
                            {c === "Laptop" && (
                                <FaLaptop className="w-10 h-10 md:w-12 md:h-12 text-orange-400" />
                            )}
                            {c === "Headphones" && (
                                <FaHeadphones className="w-10 h-10 md:w-12 md:h-12 text-orange-400" />
                            )}
                            <Typography
                                placeholder={undefined}
                                variant="h5"
                                color="blue-gray"
                                className="text-center text-base md:text-lg"
                            >
                                {c}
                            </Typography>
                            <Link
                                className="px-1 xl:px-3 py-1 rounded transition-all hover:bg-blue-500/10 text-blue-400 hover:shadow"
                                href={`/browse-products/${c}`}
                            >
                                <div className="flex items-center gap-1  font-semibold text-sm  xl:text-base">
                                    <span> View Products</span>
                                    <FaLongArrowAltRight className="h-4 w-4  xl:h-6 md:w-6 " />
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
