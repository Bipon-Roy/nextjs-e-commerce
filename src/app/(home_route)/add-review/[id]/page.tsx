import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import ReviewModel from "@/app/models/reviewModel";
import { auth } from "@/auth";
import ReviewForm from "@/components/ReviewForm";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
    params: { id: string };
}

const fetchReview = async (id: string) => {
    const session = await auth();
    if (!session?.user) {
        return redirect("/auth/signin");
    }
    await startDb();

    const review = await ReviewModel.findOne({ userId: session.user.id, product: id }).populate<{
        product: { title: string; thumbnail: { url: string } };
    }>({
        path: "product",
        select: "title thumbnail.url",
    });

    if (review) {
        return {
            id: review._id.toString(),
            rating: review.rating,
            comment: review.comment,
            product: {
                title: review.product.title,
                thumbnail: review.product.thumbnail.url,
            },
        };
    }
};
const fetchProduct = async (id: string) => {
    await startDb();
    const product = await ProductModel.findById(id);

    if (!product) {
        return null;
    }
    return {
        title: product.title,
        thumbnail: product.thumbnail.url,
    };
};

const Review = async ({ params }: Props) => {
    const productId = params.id;
    const review = await fetchReview(productId);
    const product = await fetchProduct(productId);

    if (!product) {
        return redirect("/404");
    }
    const initialValue = review
        ? {
              comment: review.comment || "",
              rating: review.rating,
          }
        : undefined;

    return (
        <div className="mt-4">
            <div className="space-y-1 max-w-fit mb-4">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={120}
                    height={120}
                    className="rounded"
                    priority
                />
                <h3 className="font-semibold md:text-lg text-blue-500">{product.title}</h3>
            </div>
            <ReviewForm productId={productId} initialValue={initialValue} />
        </div>
    );
};

export default Review;
