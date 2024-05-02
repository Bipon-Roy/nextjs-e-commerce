"use client";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter,
    Chip,
    IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import truncate from "truncate";
import { EyeIcon } from "@heroicons/react/24/outline";
import { formatPrice } from "@/utils/helper";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTransition } from "react";
interface Props {
    product: {
        id: string;
        title: string;
        description: string;
        category: string;
        thumbnail: string;
        sale: number;
        price: {
            base: number;
            discounted: number;
        };
    };
}

const ProductCard = ({ product }: Props) => {
    const [isPending, startTransition] = useTransition();
    const { loggedIn } = useAuth();
    const router = useRouter();

    const addToCart = async () => {
        if (!loggedIn) return router.push("/auth/signin");

        const res = await fetch("/api/product/cart", {
            method: "POST",
            body: JSON.stringify({ productId: product.id, quantity: 1 }),
        });

        const { error } = await res.json();
        if (!res.ok && error) {
            toast.error(error);
        } else {
            toast.success("Item added to cart.");
        }
        router.refresh();
    };
    return (
        <Card placeholder={undefined} className="w-full rounded-md">
            <CardHeader
                placeholder={undefined}
                shadow={false}
                floated={false}
                color="transparent"
                className="relative m-0 rounded-none"
            >
                <div className="absolute right-0 p-2 z-10">
                    <Chip color="red" value={`${product.sale}% off`} />
                </div>
                <div className="relative w-56 h-52 bg-transparent mx-auto">
                    <Image src={product.thumbnail} alt={product.title} fill className="" />
                </div>
            </CardHeader>
            <CardBody placeholder={undefined}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-blue-gray-800">
                        {truncate(product.title, 50)}
                    </h3>
                    <Link
                        className="mt-[2px] text-blue-500"
                        href={`/${product.title}/${product.id}`}
                    >
                        <EyeIcon className="w-5 h-5" />
                    </Link>
                </div>
                <div className="flex  items-center space-x-2 mb-2">
                    <Typography
                        placeholder={undefined}
                        color="blue-gray"
                        className="font-medium line-through text-red-400"
                    >
                        {formatPrice(product.price.base)}
                    </Typography>
                    <Typography placeholder={undefined} color="blue" className="font-medium">
                        {formatPrice(product.price.discounted)}
                    </Typography>
                </div>
                <p className="font-normal text-sm opacity-75 line-clamp-3">{product.description}</p>
            </CardBody>

            <CardFooter placeholder={undefined} className="pt-0 flex gap-4">
                <Button
                    size="sm"
                    placeholder={undefined}
                    onClick={() => startTransition(async () => await addToCart())}
                    ripple={false}
                    fullWidth={true}
                    disabled={isPending}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                >
                    Add to Cart
                </Button>
                <Button
                    disabled={isPending}
                    size="sm"
                    placeholder={undefined}
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-400 text-white shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                >
                    Buy Now
                </Button>
            </CardFooter>
        </Card>
    );
};
export default ProductCard;
