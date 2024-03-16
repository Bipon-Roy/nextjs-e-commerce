"use client";

import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password Should be at least 8 characters or longer")
        .required("Password is required"),
});

const SignUp = () => {
    const { values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched } =
        useFormik({
            initialValues: { name: "", email: "", password: "" },
            validationSchema,
            onSubmit: (values) => {
                console.log(values);
            },
        });
    const formErrors: string[] = [];

    console.log(errors);

    const { email, name, password } = values;
    return (
        <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
            <Input
                color="blue"
                name="name"
                label="Name"
                crossOrigin={undefined}
                onChange={handleChange}
                value={name}
            />
            <span className="pt-4 text-red-500">{errors.name}</span>
            <Input
                color="blue"
                name="email"
                label="Email"
                crossOrigin={undefined}
                onChange={handleChange}
                value={email}
            />
            <span className="pt-4 text-red-500">{errors.email}</span>
            <Input
                color="blue"
                name="password"
                label="Password"
                type="password"
                crossOrigin={undefined}
                onChange={handleChange}
                value={password}
            />
            <span className="pt-4 text-red-500">{errors.password}</span>
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
