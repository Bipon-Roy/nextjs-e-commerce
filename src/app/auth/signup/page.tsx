"use client";

import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SignUp = () => {
    const formErrors: string[] = [];

    return (
        <AuthFormContainer title="Create New Account">
            <Input name="name" label="Name" crossOrigin={undefined} />
            <Input name="email" label="Email" crossOrigin={undefined} />
            <Input name="password" label="Password" type="password" crossOrigin={undefined} />
            <Button type="submit" className="w-full" placeholder={undefined}>
                Sign up
            </Button>
            <div className="">
                {formErrors.map((err) => {
                    return (
                        <div key={err} className="space-x-1 flex items-center text-red-500">
                            <XMarkIcon className="w-4 h-4" />
                            <p className="text-xs">{err}</p>
                        </div>
                    );
                })}
            </div>
        </AuthFormContainer>
    );
};
export default SignUp;
