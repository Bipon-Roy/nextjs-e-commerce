"use client";

import { Typography } from "@material-tailwind/react";
import { HiShoppingBag } from "react-icons/hi2";
const LINKS = [
    {
        title: "Product",
        items: ["Overview", "Features", "Solutions", "Tutorials"],
    },
    {
        title: "Company",
        items: ["About us", "Careers", "Press", "News"],
    },
    {
        title: "Resource",
        items: ["Blog", "Newsletter", "Events", "Help center"],
    },
];
const currentYear = new Date().getFullYear();
const Footer = () => {
    return (
        <footer className="pt-6 bg-gradient-to-r from-white to-gray-200 mt-10">
            <div className="mx-auto w-full max-w-7xl px-8">
                <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
                    <div aria-labelledby="site-title">
                        <Typography
                            placeholder={undefined}
                            variant="h5"
                            className="font-semibold"
                            id="site-title"
                        >
                            <HiShoppingBag
                                className="w-12 h-12 text-orange-600 mb-2"
                                aria-hidden="true"
                            />
                            NextJs E-Shop
                        </Typography>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-4">
                        {LINKS.map(({ title, items }) => (
                            <ul key={title} aria-labelledby={title}>
                                <Typography
                                    placeholder={undefined}
                                    variant="h5"
                                    className="mb-3 font-medium"
                                    id={title}
                                >
                                    {title}
                                </Typography>
                                {items.map((link) => (
                                    <li key={link}>
                                        <Typography
                                            placeholder={undefined}
                                            as="a"
                                            href="#"
                                            className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                                            aria-label={link}
                                        >
                                            {link}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                    <Typography
                        placeholder={undefined}
                        variant="small"
                        className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
                    >
                        &copy; {currentYear}{" "}
                        <a
                            href="https://www.linkedin.com/in/bipon-roy/"
                            aria-label="LinkedIn Profile"
                        >
                            Bipon Roy
                        </a>
                        . All Rights Reserved.
                    </Typography>
                    <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
                        <Typography
                            placeholder={undefined}
                            as="a"
                            href="#"
                            className="opacity-80 transition-opacity hover:opacity-100"
                            aria-label="Facebook"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Typography>
                        <Typography
                            placeholder={undefined}
                            as="a"
                            href="#"
                            className="opacity-80 transition-opacity hover:opacity-100"
                            aria-label="Instagram"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Typography>
                        <Typography
                            placeholder={undefined}
                            as="a"
                            href="https://github.com/Bipon-Roy"
                            className="opacity-80 transition-opacity hover:opacity-100"
                            aria-label="GitHub"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2a10 10 0 00-3.162 19.498c.5.092.682-.217.682-.483 0-.238-.008-.868-.013-1.703-2.775.603-3.362-1.338-3.362-1.338-.454-1.154-1.11-1.461-1.11-1.461-.908-.621.068-.608.068-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.214-.252-4.544-1.108-4.544-4.931 0-1.088.39-1.98 1.03-2.678-.103-.253-.447-1.27.098-2.645 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844a9.55 9.55 0 012.5.336c1.91-1.295 2.748-1.025 2.748-1.025.546 1.375.202 2.392.1 2.645.64.698 1.03 1.59 1.03 2.678 0 3.83-2.334 4.676-4.556 4.922.36.31.68.92.68 1.852 0 1.337-.012 2.416-.012 2.746 0 .268.18.578.688.48A10 10 0 0012 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Typography>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
