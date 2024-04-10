import { getCloudConfig, getCloudSignature } from "@/app/(admin)/products/action";

export const uploadImage = async (file: File) => {
    const { signature, timestamp } = await getCloudSignature();
    const cloudConfig = await getCloudConfig();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", cloudConfig.api_key);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());

    const endPoint = `https://api.cloudinary.com/v1_1/${cloudConfig.name}"/image/upload`;

    const res = fetch(endPoint, {
        method: "POST",
        body: formData,
    });

    const data = (await res).json();
};
