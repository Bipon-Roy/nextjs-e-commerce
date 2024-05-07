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
        <div style={{ opacity: disabled ? "0.5" : "1" }} className="flex items-center space-x-2">
            <IconButton
                placeholder={undefined}
                disabled={disabled}
                onClick={onIncrement}
                variant="text"
            >
                <FaPlus className="w-4 h-4" />
            </IconButton>

            <span className="text-lg font-medium">{value}</span>
            <IconButton
                placeholder={undefined}
                disabled={disabled}
                onClick={onDecrement}
                variant="text"
            >
                <FaMinus className="w-4 h-4" />
            </IconButton>
        </div>
    );
};

export default CartItemCounter;
