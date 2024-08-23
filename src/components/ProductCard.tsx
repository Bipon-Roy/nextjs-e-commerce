"use client";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import truncate from "truncate";
import { formatPrice } from "@/utils/helper";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { memo, useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import SkeletonCard from "./SkeletonCard";

interface Props {
    product: {
        id: string;
        title: string;
        thumbnail: string;
        price: {
            base: number;
            discounted: number;
        };
        isInWishlist?: boolean;
    };
    loading?: boolean;
}

const ProductCard = memo(({ product, loading }: Props) => {
    const [isPending, startTransition] = useTransition();
    const { loggedIn } = useAuth();
    const router = useRouter();
    const [isShow, setIsShow] = useState(false);

    if (loading) return <SkeletonCard />;

    const productId = product.id;

    const addToCart = async () => {
        if (!loggedIn) return router.push("/auth/signin");

        const res = await fetch("/api/product/cart", {
            method: "POST",
            body: JSON.stringify({ productId: product.id, quantity: 1 }),
        });

        const { error, message } = await res.json();
        if (!res.ok && error) {
            toast.error(error);
        } else {
            toast.success(message);
        }
        router.refresh();
    };

    const handleWishlist = async () => {
        if (!productId) return;

        if (!loggedIn) return router.push("/auth/signin");

        const res = await fetch("/api/product/wishlist", {
            method: "POST",
            body: JSON.stringify({ productId }),
        });

        const { error, message } = await res.json();

        if (!res.ok && error) {
            toast.error(error);
        } else {
            toast.success(message);
        }
        router.refresh();
    };

    return (
        <Card
            placeholder={undefined}
            className="w-full rounded-md shadow relative"
            onMouseEnter={() => setIsShow(true)}
            onMouseLeave={() => setIsShow(false)}
        >
            <CardHeader
                placeholder={undefined}
                shadow={false}
                floated={false}
                color="transparent"
                className=" m-0 rounded-none"
            >
                <div className="relative h-28 w-28 md:w-52 md:h-48 bg-transparent mx-auto mt-2">
                    <Image src={product.thumbnail} alt={product.title} fill priority />
                </div>
                <div
                    className={`absolute top-0 right-0 transition-opacity duration-300 ${
                        isShow ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Button
                        onClick={() => startTransition(async () => await handleWishlist())}
                        variant="text"
                        placeholder={undefined}
                        disabled={isPending}
                        className="rounded hover:bg-red-500/10 text-red-500 p-1"
                    >
                        {product.isInWishlist ? (
                            <FaHeart className="h-4 w-4 md:w-5 md:h-5 text-red-600" />
                        ) : (
                            <FaRegHeart className="h-4 w-4 md:w-5 md:h-5" />
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardBody placeholder={undefined} className="flex-1 px-2 md:px-4 py-3 space-y-2">
                <h3 className="font-semibold text-black text-sm md:text-base">
                    {truncate(product.title, 50)}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                    <Typography
                        placeholder={undefined}
                        className="font-semibold line-through text-xs md:text-sm"
                    >
                        {formatPrice(product.price.base)}
                    </Typography>
                    <Typography
                        color="black"
                        placeholder={undefined}
                        className="font-semibold text-sm md:text-base"
                    >
                        {formatPrice(product.price.discounted)}
                    </Typography>
                    <p className="px-1 text-xs bg-red-500 text-white rounded ">
                        {Math.round(
                            ((product.price.base - product.price.discounted) / product.price.base) *
                                100
                        )}
                        % off
                    </p>
                </div>
            </CardBody>

            <CardFooter
                placeholder={undefined}
                className="px-[5px] md:px-4 pt-1 grid grid-cols-2 gap-[6px] md:gap-3"
            >
                <Button
                    placeholder={undefined}
                    onClick={() => startTransition(async () => await addToCart())}
                    fullWidth={true}
                    disabled={isPending}
                    className="bg-blue-800/10 text-blue-700 shadow-none px-[3px] py-1 md:p-2 rounded font-semibold capitalize hover:shadow text-[11px] md:text-xs"
                >
                    Add to Cart
                </Button>
                <Link href={`/${product.title}/${product.id}`}>
                    <Button
                        placeholder={undefined}
                        fullWidth={true}
                        className="bg-orange-500/20 text-orange-700 shadow-none px-[3px] py-1 md:p-2 rounded font-semibold capitalize hover:shadow text-[11px] md:text-xs"
                    >
                        See Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
