"use client";

import Image from "next/image";
import SectionHeading from "./SectionHeading";

const AboutUs = () => {
    return (
        <div className="text-white">
            <div className="max-w-7xl mx-auto ">
                <SectionHeading title="About" subTitle="Us" />

                <div className="grid md:grid-cols-2 gap-4  xl:gap-8 py-5">
                    <div className="relative h-80 md:h-full w-full rounded-md">
                        <Image
                            src="https://i.ibb.co/sC7TDt7/about.jpg"
                            className="rounded-md"
                            alt="About E-Shop"
                            fill
                        />
                    </div>
                    <div className="text-black space-y-3 dark:text-white text-sm lg:text-base">
                        <h1 className="text-xl lg:text-3xl font-bold  text-center">
                            <span className="text-primary ">Welcome to eShop </span> - Your Trusted
                            Source for Premium Electronics!
                        </h1>
                        <p className="font-medium">
                            At eShop, we are passionate about technology and committed to providing
                            you with the latest and greatest electronics products. With a dedication
                            to quality, innovation, and customer satisfaction, we&apos;ve become a
                            go-to destination for tech enthusiasts, gadget lovers, and everyday
                            consumers.
                        </p>
                        <p className="text-xl lg:text-2xl font-bold text-center">Why Choose Us?</p>
                        <div className="space-y-4">
                            <p>
                                <span className="font-semibold mr-1">Wide Product Selection:</span>
                                Discover a wide range of electronic products, from cutting-edge
                                smartphones to high-performance laptops and more, all under one
                                roof.
                            </p>
                            <p>
                                <span className="font-semibold mr-1">Quality Assurance:</span>
                                Our commitment to quality means you can trust in the products we
                                offer. We source from reputable brands and manufacturers.
                            </p>
                            <p>
                                <span className="font-semibold mr-1">Competitive Pricing:</span>
                                Enjoy competitive prices, frequent discounts, and special offers
                                that help you stay up-to-date with the latest tech without breaking
                                the bank.
                            </p>
                            <p>
                                <span className="font-semibold mr-1">Expert Customer Support:</span>
                                Our knowledgeable and friendly customer support team is here to
                                assist you every step of the way.
                            </p>
                            <p>
                                <span className="font-semibold mr-1">
                                    Fast and Secure Shipping:
                                </span>
                                Experience swift and secure delivery to your doorstep, ensuring you
                                get your hands on your new gadgets quickly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
