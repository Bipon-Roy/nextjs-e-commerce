import { Document, ObjectId } from "mongoose";

interface OrderDocument extends Document {
    userId: ObjectId;
    stripeCustomerId: string;
    paymentIntent: string;
    totalAmount: number;
    shippingDetails: {
        address: {
            city: string;
            country: string;
            line1: string;
            line2?: string | null;
            postal_code: string;
            state: string;
        };
        email: string;
        name: string;
    };
    paymentStatus: string;
    deliveryStatus: "delivered" | "ordered" | "shipped";
    orderItems: {
        id: string;
        title: string;
        thumbnail: string;
        totalPrice: number;
        price: string;
        qty: number;
    }[];
}
