"use server";

import startDb from "@/app/lib/db";
import FeaturedProductModel from "@/app/models/featuredProduct";
import { NewFeaturedProduct, UpdateFeaturedProduct } from "@/types";

export const createFeaturedProduct = async (info: NewFeaturedProduct) => {
    try {
        await startDb();
        await FeaturedProductModel.create({ ...info });
    } catch (error) {
        throw error;
    }
};
export const updateFeaturedProduct = async (id: string, info: UpdateFeaturedProduct) => {
    try {
        await startDb();
        await FeaturedProductModel.findByIdAndUpdate(id, { ...info });
    } catch (error) {
        throw error;
    }
};
