import { getCloudConfig, getCloudSignature } from "@/app/(admin)/products/action";

export const uploadImage = async (file: File) => {
    const { signature, timestamp } = await getCloudSignature();
    const cloudConfig = await getCloudConfig();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", cloudConfig.api_key);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());

    const endpoint = `https://api.cloudinary.com/v1_1/${cloudConfig.name}/image/upload`;

    const res = await fetch(endpoint, { method: "POST", body: formData });

    const data = await res.json();

    return { url: data.secure_url, id: data.public_id };
};

export const formatPrice = (amount: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
};

export const extractImagePublicId = (url: string) => {
    const spiltData = url.split("/");
    const lastItem = spiltData[spiltData.length - 1];
    return lastItem.split(".")[0];
};
