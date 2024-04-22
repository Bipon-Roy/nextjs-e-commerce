"use client";

import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Link from "next/link";
import { signIn } from "next-auth/react";

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
                const res = await fetch("/api/users", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
                const { message, error } = (await res.json()) as {
                    message: string;
                    error: string;
                };

                if (res.ok) {
                    toast.success(message);
                    await signIn("credentials", { email, password });
                }

                if (!res.ok && error) {
                    toast.error(error);
                }
            },
        });

    const { email, name, password } = values;

    type valueKeys = keyof typeof values;
    const error = (name: valueKeys) => {
        return errors[name] && touched[name] ? true : false;
    };
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
                error={error("name")}
            />
            <span className=" text-red-500"> {errors.name && touched.name && errors.name}</span>
            <Input
                color="blue"
                name="email"
                label="Email"
                crossOrigin={undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                value={email}
                error={error("email")}
            />
            <span className=" text-red-500">{errors.email && touched.email && errors.email}</span>
            <Input
                color="blue"
                name="password"
                label="Password"
                type="password"
                crossOrigin={undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                value={password}
                error={error("password")}
            />

            <span className=" text-red-500">
                {errors.password && touched.password && errors.password}
            </span>

            <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full"
                placeholder={undefined}
            >
                Sign up
            </Button>
            <div className="flex items-center justify-between">
                <Link href="/auth/signin">Sign in</Link>
                <Link href="/auth/forget-password">Forget password</Link>
            </div>
        </AuthFormContainer>
    );
};
export default SignUp;
