export default function LoadingSingleProduct() {
    return (
        <div className="p-4 animate-pulse">
            <div className="flex xl:flex-row flex-col md:gap-4 gap-2">
                <div className="flex-1 xl:self-start self-center">
                    {/* for image */}
                    <div className="w-full aspect-square ">
                        <div className="grid h-full w-full place-items-center rounded-lg bg-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-12 w-12 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* for image gallery */}
                    <div className="flex items-center gap-4 my-4">
                        {Array(3).fill(
                            <div className="grid w-20 h-20 place-items-center rounded-lg bg-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-12 w-12 text-gray-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 space-y-6">
                    {/* for title */}
                    <div className="space-y-4">
                        <div className="w-full h-4 aspect-square bg-gray-300" />
                        <div className="w-1/2 h-4 aspect-square bg-gray-300" />
                    </div>

                    {/* for description */}
                    <div className="space-y-4">
                        <div className="w-full h-2 aspect-square bg-gray-300" />
                        <div className="flex gap-4">
                            <div className="w-1/2 h-2 aspect-square bg-gray-300" />
                            <div className="w-1/2 h-2 aspect-square bg-gray-300" />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2 h-2 aspect-square bg-gray-300" />
                            <div className="w-1/2 h-2 aspect-square bg-gray-300" />
                        </div>
                    </div>

                    <div className="px-4 space-y-4">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                            <div className="w-1/2 h-2 aspect-square bg-gray-300" />
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                            <div className="w-1/2 h-2 aspect-square bg-gray-300" />
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                            <div className="w-1/2 h-2 aspect-square bg-gray-300" />
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                            <div className="w-1/2 h-2 aspect-square bg-gray-300" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
