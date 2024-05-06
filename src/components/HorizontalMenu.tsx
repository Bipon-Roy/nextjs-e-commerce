"use client";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { TbDeviceWatch } from "react-icons/tb";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Link from "next/link";

import categories from "@/utils/ProductCategories";

const HorizontalMenu = () => {
    return (
        <>
            <Typography
                placeholder={undefined}
                variant="h4"
                color="blue-gray"
                className="text-center"
            >
                Product <span className="text-orange-400">Categories</span>
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((c) => (
                    <Card key={c} placeholder={undefined} className="border shadow-sm ">
                        <CardBody
                            placeholder={undefined}
                            className="space-y-2 flex flex-col justify-center items-center"
                        >
                            {c === "Phone" && (
                                <IoPhonePortraitOutline className="w-16 h-16 text-orange-400" />
                            )}
                            {c === "Watch" && (
                                <TbDeviceWatch className="w-16 h-16 text-orange-400" />
                            )}
                            <Typography
                                placeholder={undefined}
                                variant="h5"
                                color="blue-gray"
                                className="text-center"
                            >
                                {c}
                            </Typography>
                            <Link
                                className="bg-gray-200 px-4 py-1 rounded-md"
                                href={`/browse-products/${c}`}
                            >
                                <div className="flex items-center gap-2 text-blue-500">
                                    View Products
                                    <FaLongArrowAltRight className="h-6 w-6 " />
                                </div>
                            </Link>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default HorizontalMenu;
