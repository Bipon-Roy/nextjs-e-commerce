"use client";
import { Button, Input, Option, Select, Textarea } from "@material-tailwind/react";
import { useEffect, useState, useTransition, ChangeEventHandler } from "react";
import categories from "@/utils/ProductCategories";
import ImageSelector from "@components/ImageSelector";
import { NewProductInfo } from "@/types";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
interface Props {
    initialValue?: InitialValue;
    onSubmit(values: NewProductInfo): void;
    onImageRemove?(source: string): void;
}

export interface InitialValue {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    images?: string[];
    bulletPoints: string[];
    mrp: number;
    salePrice: number;
    category: string;
    quantity: number;
}

const defaultValue = {
    title: "",
    description: "",
    bulletPoints: [""],
    mrp: 0,
    salePrice: 0,
    category: "",
    quantity: 0,
};

const ProductForm = (props: Props) => {
    const { onSubmit, onImageRemove, initialValue } = props;
    const [isPending, startTransition] = useTransition();
    const [images, setImages] = useState<File[]>([]);
    const [thumbnail, setThumbnail] = useState<File>();
    const [isForUpdate, setIsForUpdate] = useState(false);
    const [productInfo, setProductInfo] = useState({ ...defaultValue });
    const [thumbnailSource, setThumbnailSource] = useState<string[]>();
    const [productImagesSource, setProductImagesSource] = useState<string[]>();

    const fields = productInfo.bulletPoints;

    const addMoreBulletPoints = () => {
        setProductInfo({
            ...productInfo,
            bulletPoints: [...productInfo.bulletPoints, ""],
        });
    };

    const removeBulletPoint = (indexToRemove: number) => {
        const points = [...productInfo.bulletPoints];
        const filteredPoints = points.filter((_, index) => index !== indexToRemove);
        setProductInfo({
            ...productInfo,
            bulletPoints: [...filteredPoints],
        });
    };

    const updateBulletPointValue = (value: string, index: number) => {
        const oldValues = [...fields];
        oldValues[index] = value;

        setProductInfo({ ...productInfo, bulletPoints: [...oldValues] });
    };

    const removeImage = async (index: number) => {
        if (!productImagesSource) {
            return;
        }

        // if image is from cloud we want to remove it from cloud.
        const imageToRemove = productImagesSource[index];
        const cloudSourceUrl = "https://res.cloudinary.com";

        if (imageToRemove.startsWith(cloudSourceUrl)) {
            onImageRemove && onImageRemove(imageToRemove);
        } else {
            // if this image is from local state we want to update local state
            const fileIndexDifference = productImagesSource.length - images.length;
            const indexToRemove = index - fileIndexDifference;
            const newImageFiles = images.filter((_, i) => {
                if (i !== indexToRemove) return true;
            });

            setImages([...newImageFiles]);
        }

        // also we want to update UI
        const newImagesSource = productImagesSource.filter((_, i) => {
            if (i !== index) return true;
        });

        setProductImagesSource([...newImagesSource]);
    };

    const dynamicBtnTitle = () => {
        if (isForUpdate) return isPending ? "Updating" : "Update Product";
        return isPending ? "Creating" : "Create Product";
    };

    useEffect(() => {
        if (initialValue) {
            setProductInfo({ ...initialValue });
            setThumbnailSource([initialValue.thumbnail]);
            setProductImagesSource(initialValue.images);
            setIsForUpdate(true);
        }
    }, [initialValue]);

    const onImagesChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const files = target.files;
        if (files) {
            const newImages = Array.from(files).map((item) => item);
            const oldImages = productImagesSource || [];
            setImages([...images, ...newImages]);
            setProductImagesSource([...oldImages, ...newImages.map((file) => URL.createObjectURL(file))]);
        }
    };

    const onThumbnailChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const files = target.files;
        if (files) {
            const file = files[0];
            setThumbnail(file);
            setThumbnailSource([URL.createObjectURL(file)]);
        }
    };

    console.log(productInfo);

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="mb-4 text-xl font-medium">{isForUpdate ? "Update Product" : "Add new product"}</h1>

            <form
                action={() =>
                    startTransition(async () => {
                        await onSubmit({ ...productInfo, images, thumbnail });
                    })
                }
                className="space-y-6"
            >
                <Input
                    color="orange"
                    crossOrigin={undefined}
                    label="Title"
                    value={productInfo.title}
                    onChange={({ target }) => setProductInfo({ ...productInfo, title: target.value })}
                />

                <Textarea
                    color="orange"
                    className="h-52"
                    label="Description"
                    value={productInfo.description}
                    onChange={({ target }) => setProductInfo({ ...productInfo, description: target.value })}
                />
                <div className="space-y-4">
                    <h3>Poster</h3>
                    <ImageSelector id="thumb" images={thumbnailSource} onChange={onThumbnailChange} />

                    <h3>Images</h3>
                    <ImageSelector
                        multiple
                        id="images"
                        images={productImagesSource}
                        onRemove={removeImage}
                        onChange={onImagesChange}
                    />
                </div>

                <Select
                    color="orange"
                    placeholder={undefined}
                    onChange={(category) => {
                        if (category) setProductInfo({ ...productInfo, category });
                    }}
                    value={productInfo.category}
                    label="Select Category"
                >
                    {categories.map((c) => (
                        <Option value={c} key={c}>
                            {c}
                        </Option>
                    ))}
                </Select>

                <div className="flex gap-4">
                    <div className="space-y-4 flex-1">
                        <h3>Price</h3>

                        <Input
                            color="orange"
                            crossOrigin={undefined}
                            value={productInfo.mrp}
                            label="MRP"
                            onChange={({ target }) => {
                                const mrp = +target.value;
                                setProductInfo({ ...productInfo, mrp });
                            }}
                            className="mb-4"
                        />
                        <Input
                            color="orange"
                            crossOrigin={undefined}
                            value={productInfo.salePrice}
                            label="Sale Price"
                            onChange={({ target }) => {
                                const salePrice = +target.value;
                                setProductInfo({ ...productInfo, salePrice });
                            }}
                            className="mb-4"
                        />
                    </div>

                    <div className="space-y-4 flex-1">
                        <h3>Stock</h3>

                        <Input
                            color="orange"
                            crossOrigin={undefined}
                            value={productInfo.quantity}
                            label="Qty"
                            onChange={({ target }) => {
                                const quantity = +target.value;
                                if (!isNaN(quantity)) setProductInfo({ ...productInfo, quantity });
                            }}
                            className="mb-4"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3>Specifications</h3>
                    {fields.map((field, index) => (
                        <div key={index} className="flex items-center">
                            <Input
                                color="orange"
                                crossOrigin={undefined}
                                type="text"
                                value={field}
                                label={`Bullet point ${index + 1}`}
                                onChange={({ target }) => updateBulletPointValue(target.value, index)}
                                className="mb-4"
                            />
                            {fields.length > 1 ? (
                                <button onClick={() => removeBulletPoint(index)} type="button" className="ml-2">
                                    <BiSolidTrashAlt className="w-5 h-5 text-red-600" />
                                </button>
                            ) : null}
                        </div>
                    ))}

                    <button
                        type="button"
                        disabled={isPending}
                        onClick={(e) => {
                            e.preventDefault();
                            addMoreBulletPoints();
                        }}
                        className="flex items-center gap-1 ml-auto px-4 py-1 bg-orange-500/10 text-orange-500 font-semibold"
                    >
                        <FaPlus className="w-4 h-4" />
                        <span>Add more</span>
                    </button>
                </div>

                <Button placeholder={undefined} color="blue" className="w-full" disabled={isPending} type="submit">
                    {dynamicBtnTitle()}
                </Button>
            </form>
        </div>
    );
};

export default ProductForm;
