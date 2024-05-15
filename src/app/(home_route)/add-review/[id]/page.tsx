import ReviewForm from "@/components/ReviewForm";

interface Props {
    params: { id: string };
}

const Review = ({ params }: Props) => {
    const productId = params.id;
    return (
        <div className="mt-4">
            <ReviewForm productId={productId} />
        </div>
    );
};

export default Review;
