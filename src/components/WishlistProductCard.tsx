"use client";

import Image from "next/image";
import { memo, useTransition } from "react";
import { Button } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/helper";

interface Props {
    product: {
        id: string;
        title: string;
        price: number;
        thumbnail: string;
    };
}

const WishlistProductCard = memo(({ product }: Props) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const { id, price, thumbnail, title } = product;

    const updateWishlist = async () => {
        if (!id) return;

        const res = await fetch("/api/product/wishlist", {
            method: "POST",
            body: JSON.stringify({ productId: id }),
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
        <div className="flex gap-4 items-center shadow bg-gray-50">
            <Image src={thumbnail} width={80} height={80} alt={title} />
            <Link className="flex-1 cursor-pointer h-full" href={`/${title}/${id}`}>
                <h1 className="font-semibold">{title}</h1>
                <p>{formatPrice(price)}</p>
            </Link>
            <Button
                placeholder={undefined}
                onClick={() => {
                    startTransition(async () => await updateWishlist());
                }}
                size="sm"
                variant="text"
                disabled={isPending}
            >
                <MdDelete className="text-red-600 w-5 h-5" />
            </Button>
        </div>
    );
});

WishlistProductCard.displayName = "WishlistProductCard";
export default WishlistProductCard;
