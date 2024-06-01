"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
    images: string[];
}

const settings: Settings = {
    dots: false,
    lazyLoad: "anticipated",
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    className: "max-w-[360px] mx-auto md:w-[500px]",
};

const ProductImageSlider = (props: Props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { images } = props;
    const slider = useRef<Slider>(null);

    return (
        <div>
            <Slider
                {...settings}
                afterChange={(currentSlide) => {
                    setCurrentSlide(currentSlide);
                }}
                ref={slider}
            >
                {images.map((img, index) => {
                    return (
                        <Image key={index} src={img} alt="Banner Image" width={500} height={500} />
                    );
                })}
            </Slider>
            <div className="flex py-2 gap-2">
                {images.map((img, index) => {
                    return (
                        <Image
                            onClick={() => slider.current?.slickGoTo(index)}
                            className={index === currentSlide ? "ring ring-blue-500" : ""}
                            key={index}
                            src={img}
                            alt="testing"
                            width={80}
                            height={80}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ProductImageSlider;
