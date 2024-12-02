"use client";
import { useState, useEffect } from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { TbDeviceWatch } from "react-icons/tb";
import { FaLongArrowAltRight, FaHeadphones, FaLaptop } from "react-icons/fa";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useRouter, usePathname } from "next/navigation";
import categories from "@/utils/ProductCategories";
import SectionHeading from "./SectionHeading";

const ProductMenu = () => {
    const [activeCategory, setActiveCategory] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const activePath = pathname.split("/")[2];
        setActiveCategory(activePath);
    }, [pathname]);

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        router.push(`/browse-products/${category}`);
    };

    return (
        <>
            <SectionHeading title="Product" subTitle="Categories" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((c) => (
                    <Card
                        placeholder={undefined}
                        key={c}
                        onClick={() => handleCategoryClick(c)}
                        className="shadow-none hover:shadow transition-all cursor-pointer"
                    >
                        <CardBody
                            placeholder={undefined}
                            className="space-y-2 flex flex-col justify-center items-center px-1 py-4 md:py-6 "
                        >
                            {c === "Phone" && (
                                <div className="p-5 bg-gray-200 rounded-full">
                                    <IoPhonePortraitOutline className="w-10 h-10 md:w-12 md:h-12 text-deep-orange-400" />
                                </div>
                            )}
                            {c === "Watch" && (
                                <div className="p-5 bg-gray-200 rounded-full">
                                    <TbDeviceWatch className="w-10 h-10 md:w-12 md:h-12 text-deep-orange-400" />
                                </div>
                            )}
                            {c === "Laptop" && (
                                <div className="p-5 bg-gray-200 rounded-full">
                                    <FaLaptop className="w-10 h-10 md:w-12 md:h-12 text-deep-orange-400" />
                                </div>
                            )}
                            {c === "Headphones" && (
                                <div className="p-5 bg-gray-200 rounded-full">
                                    <FaHeadphones className="w-10 h-10 md:w-12 md:h-12 text-deep-orange-400" />
                                </div>
                            )}
                            <Typography
                                placeholder={undefined}
                                variant="h5"
                                color="black"
                                className="text-center text-base md:text-lg"
                            >
                                {c}
                            </Typography>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default ProductMenu;

// className="px-1 xl:px-3 py-1 rounded transition-all hover:bg-blue-500/10 text-blue-400 hover:shadow cursor-pointer"
