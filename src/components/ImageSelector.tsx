import React, { ChangeEventHandler } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { BiSolidTrashAlt } from "react-icons/bi";
import ImageInput from "@components/Ui/ImageInput";
import SelectedImageThumb from "@components/Ui/SelectedImage";

interface Props {
    id: string;
    images?: string[];
    multiple?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onRemove?(index: number): void;
}

const ImageSelector = ({ id, images, onChange, onRemove, multiple }: Props) => {
    const icon = multiple ? (
        <div className="relative">
            <MdAddPhotoAlternate className="w-8 h-8 bg-white" />
            <MdAddPhotoAlternate className="w-8 h-8 absolute -top-2 -right-2 -z-10" />
        </div>
    ) : (
        <MdAddPhotoAlternate className="w-8 h-8" />
    );

    return (
        <div className="flex items-center gap-4">
            {images?.map((img, index) => {
                return (
                    <div key={index} className="relative">
                        <SelectedImageThumb src={img} />
                        {multiple ? (
                            <div
                                onClick={() => onRemove && onRemove(index)}
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded cursor-pointer"
                            >
                                <BiSolidTrashAlt className="w-4 h-4" />
                            </div>
                        ) : null}
                    </div>
                );
            })}

            <ImageInput id={id} onChange={onChange} multiple={multiple}>
                {icon}
            </ImageInput>
        </div>
    );
};

export default ImageSelector;
