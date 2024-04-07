import { Document } from "mongoose";

export interface NewProduct {
    title: string;
    description: string;
    bulletPoints?: string[];
    thumbnail: { url: string; id: string };
    images?: { url: string; id: string }[];
    price: {
        base: number;
        discounted: number;
    };
    category: string;
    quantity: number;
    rating?: number;
}
