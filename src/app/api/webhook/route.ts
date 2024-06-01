import { getCartItems } from "@/app/lib/cartHelper";
import cartModel from "@/app/models/CartModel";
import OrderModel from "@/app/models/orderModel";
import ProductModel from "@/app/models/productModel";
import { CartItems, StripeCustomerInfo } from "@/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY!;
const webHookSecret = process.env.STRIPE_WEBHOOK_KEY!;
const stripe = new Stripe(stripeSecret, {
    apiVersion: "2024-04-10",
});

export const POST = async (req: Request) => {
    const data = await req.text();
    const signature = req.headers.get("stripe-signature")!;

    let event;

    try {
        event = await stripe.webhooks.constructEvent(data, signature, webHookSecret);
    } catch (error) {
        return NextResponse.json({ error: (error as any).message }, { status: 400 });
    }

    try {
        if (event.type === "checkout.session.completed") {
            const stripeSession = event.data.object as {
                customer: string;
                payment_intent: string;
                amount_subtotal: number;
                customer_details: any;
                payment_status: string;
            };
            const customer = (await stripe.customers.retrieve(
                stripeSession.customer
            )) as unknown as StripeCustomerInfo;

            const { cartId, userId, type, product } = customer.metadata;

            //create order list for checkout
            if (type === "checkout") {
                const cartItems = await getCartItems(userId, cartId);
                await OrderModel.create({
                    userId,
                    stripeCustomerId: stripeSession.customer,
                    paymentIntent: stripeSession.payment_intent,
                    totalAmount: stripeSession.amount_subtotal / 100,
                    shippingDetails: {
                        name: stripeSession.customer_details.name,
                        email: stripeSession.customer_details.email,
                        address: stripeSession.customer_details.address,
                    },
                    paymentStatus: stripeSession.payment_status,
                    deliveryStatus: "ordered",
                    orderItems: cartItems.products,
                });

                //manage product stock
                const updateProductStockPromise = cartItems.products.map(async (product) => {
                    return await ProductModel.findByIdAndUpdate(product.id, {
                        $inc: { quantity: -product.qty },
                    });
                });
                await Promise.all(updateProductStockPromise);

                //remove cart items
                await cartModel.findByIdAndDelete(cartId);
            }

            if (type === "instant-checkout") {
                const productInfo = JSON.parse(product);

                await OrderModel.create({
                    userId,
                    stripeCustomerId: stripeSession.customer,
                    paymentIntent: stripeSession.payment_intent,
                    totalAmount: stripeSession.amount_subtotal / 100,
                    shippingDetails: {
                        name: stripeSession.customer_details.name,
                        email: stripeSession.customer_details.email,
                        address: stripeSession.customer_details.address,
                    },
                    paymentStatus: stripeSession.payment_status,
                    deliveryStatus: "ordered",
                    orderItems: [{ ...productInfo }],
                });

                //manage product stock
                await ProductModel.findByIdAndUpdate(productInfo.id, {
                    $inc: { quantity: -1 },
                });
            }
        }
        return NextResponse.json(
            {
                success: true,
                message: "Order placed successfully!!",
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something went wrong, Can not create order!",
                message: "Internal server error!",
            },
            { status: 500 }
        );
    }
};
