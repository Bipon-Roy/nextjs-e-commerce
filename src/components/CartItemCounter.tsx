"use client";

import { IconButton } from "@material-tailwind/react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

interface Props {
    value: number;
    onDecrement?(): void;
    onIncrement?(): void;
    disabled?: boolean;
}

const CartItemCounter = ({ onDecrement, onIncrement, disabled, value }: Props) => {
    return (
        <div
            className={`flex items-center gap-2 ${
                disabled ? "opacity-50" : "opacity-100"
            } border max-w-fit`}
        >
            <IconButton
                size="sm"
                placeholder={undefined}
                disabled={disabled}
                onClick={onIncrement}
                variant="text"
                className="rounded-none border-r"
            >
                <FaPlus className="w-3 h-3 md:w-4 md:h-4" />
            </IconButton>

            <p>{value}</p>

            <IconButton
                size="sm"
                placeholder={undefined}
                disabled={disabled || value === 1}
                onClick={onDecrement}
                variant="text"
                className="rounded-none border-l"
            >
                <FaMinus className="w-3 h-3 md:w-4 md:h-4" />
            </IconButton>
        </div>
    );
};

export default CartItemCounter;
