"use client";

import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import CartCounter from "./CartItemCounter";

const BuyProduct = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity((prevCount) => prevCount + 1);
    };

    const handleDecrement = () => {
        if (quantity === 0) return;
        setQuantity((prevCount) => prevCount - 1);
    };

    return (
        <div className="flex items-center space-x-2">
            <CartCounter
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
                value={quantity}
            />

            <Button placeholder={undefined} variant="text">
                Add to Cart
            </Button>
            <Button placeholder={undefined} color="amber" className="rounded-full">
                Buy Now
            </Button>
        </div>
    );
};

export default BuyProduct;
