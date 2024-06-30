import CartItems from "@components/CartItems";
import { fetchCartProducts } from "./action";

const Cart = async () => {
    const cart = await fetchCartProducts();

    if (!cart)
        return (
            <div className="h-[350px] flex justify-center items-center">
                <p className="text-red-500 text-center text-lg md:text-2xl">
                    Currently, no items are in the cart!
                </p>
            </div>
        );
    return (
        <CartItems
            cartId={cart.id}
            products={cart.products}
            cartTotal={cart.totalPrice}
            totalQty={cart.totalQty}
        />
    );
};

export default Cart;
