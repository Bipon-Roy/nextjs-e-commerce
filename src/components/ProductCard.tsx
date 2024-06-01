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
import { useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

interface Props {
    product: {
        id: string;
        title: string;
        thumbnail: string;
        sale: number;
        price: {
            base: number;
            discounted: number;
        };
        isInWishlist?: boolean;
    };
}

const ProductCard = ({ product }: Props) => {
    const [isPending, startTransition] = useTransition();
    const { loggedIn } = useAuth();
    const router = useRouter();

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
        <Card placeholder={undefined} className="w-full rounded-md shadow">
            <CardHeader
                placeholder={undefined}
                shadow={false}
                floated={false}
                color="transparent"
                className=" m-0 rounded-none"
            >
                <div className="relative h-36 w-36 md:w-52 md:h-48 bg-transparent mx-auto mt-2">
                    <Image src={product.thumbnail} alt={product.title} fill />
                </div>
                <div className="absolute top-0 right-0">
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
                <h3 className="font-semibold text-blue-gray-800 text-sm md:text-base ">
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
                        {product.sale}% off
                    </p>
                </div>
            </CardBody>

            <CardFooter
                placeholder={undefined}
                className="px-2 md:px-4 pt-1 grid grid-cols-2 gap-2 md:gap-3"
            >
                <Button
                    size="sm"
                    placeholder={undefined}
                    onClick={() => startTransition(async () => await addToCart())}
                    fullWidth={true}
                    disabled={isPending}
                    className="bg-blue-800/10 text-blue-700 shadow-none px-1 py-1 md:p-2 rounded font-semibold capitalize hover:shadow"
                >
                    Add to Cart
                </Button>
                <Link href={`/${product.title}/${product.id}`}>
                    <Button
                        size="sm"
                        placeholder={undefined}
                        fullWidth={true}
                        className="bg-orange-500/20 text-orange-700 shadow-none px-1 py-1 md:p-2 rounded font-semibold capitalize hover:shadow"
                    >
                        See Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
export default ProductCard;
