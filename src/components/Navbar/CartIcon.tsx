import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

interface Props {
    cartItems: number;
}
const CartIcon = ({ cartItems }: Props) => {
    return (
        <Link
            className="bg-yellow-400 w-6 h-6 2xl:w-8 2xl:h-8 flex items-center justify-center p-2 rounded-full relative"
            href="/cart"
        >
            <AiOutlineShoppingCart className="w-5 h-5" />
            <div className="absolute bg-red-500 text-white 2xl:text-xs text-[9px] -top-2 -right-1 w-4 h-4 2xl:w-5 2xl:h-5 flex items-center justify-center rounded-full">
                {cartItems}
            </div>
        </Link>
    );
};

export default CartIcon;
