"use client";

import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

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
            onSubmit: async (values) => {
                try {
                    const res = await fetch("http://localhost:3000/api/users", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });
                    console.log(res);

                    if (res.ok) {
                        const { message } = (await res.json()) as { message: string };
                        toast.success(message);
                    }
                } catch (error) {
                    alert(error);
                }
            },
        });
    const formErrors: string[] = [];

    const { email, name, password } = values;
    return (
        <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
            <Input
                color="blue"
                name="name"
                label="Name"
                crossOrigin={undefined}
                onChange={handleChange}
                onBlur={handleBlur}
                value={name}
            />
            <span className="pt-4 text-red-500"> {errors.name && touched.name && errors.name}</span>
            <Input
                color="blue"
                name="email"
                label="Email"
                crossOrigin={undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                value={email}
            />
            <span className="pt-4 text-red-500">
                {errors.email && touched.email && errors.email}
            </span>
            <Input
                color="blue"
                name="password"
                label="Password"
                type="password"
                crossOrigin={undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                value={password}
            />
            <span className="pt-4 text-red-500">
                <span className="pt-4 text-red-500">
                    {errors.password && touched.password && errors.password}
                </span>
            </span>
            <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full"
                placeholder={undefined}
            >
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
