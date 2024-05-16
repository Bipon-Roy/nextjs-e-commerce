import startDb from "@/app/lib/db";
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

const Review = async ({ params }: Props) => {
    const productId = params.id;
    const review = await fetchReview(productId);
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
                    src={review?.product.thumbnail || ""}
                    alt={review?.product.title || "thumbnail"}
                    width={120}
                    height={120}
                    className="rounded"
                />
                <h3 className="font-semibold md:text-lg text-blue-500">{review?.product.title}</h3>
            </div>
            <ReviewForm productId={productId} initialValue={initialValue} />
        </div>
    );
};

export default Review;
