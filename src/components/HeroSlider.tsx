"use client";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface FeaturedProduct {
    id: string;
    banner: string;
    title: string;
    link: string;
    linkTitle: string;
}

interface Props {
    products: FeaturedProduct[];
}

const settings: Settings = {
    dots: true,
    lazyLoad: "anticipated",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
};

const HeroSlider = ({ products }: Props) => {
    const router = useRouter();

    if (!products.length) return null;

    return (
        <div className="h-[320px] md:h-[450px] mt-4 rounded-md ">
            <Slider {...settings}>
                {products.map(({ banner, title, link, linkTitle }, index) => {
                    return (
                        <div className="select-none relative" key={index}>
                            <div className="w-full h-[320px] md:h-[450px]">
                                <Image className="rounded-md" fill src={banner} alt={title} />
                            </div>
                            <div className="absolute inset-0 p-5">
                                <div className="w-[65%] md:w-1/2 h-full flex flex-col items-start justify-center space-y-2">
                                    <h1 className="text-base md:text-3xl font-semibold text-left mb-2">
                                        {title}
                                    </h1>
                                    <Button
                                        size="sm"
                                        placeholder={undefined}
                                        onClick={() => router.push(link)}
                                    >
                                        {linkTitle}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default HeroSlider;
