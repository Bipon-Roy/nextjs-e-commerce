"use client";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import AuthFormContainer from "@components/AuthFormContainer";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const SignIn = () => {
    const router = useRouter();

    const {
        values,
        isSubmitting,
        touched,
        errors,
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldValue,
    } = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema,
        onSubmit: async (values) => {
            const res = await signIn("credentials", {
                ...values,
                redirect: false,
            });

            if (res?.error === "CredentialsSignin") {
                toast.error("Email/Password mismatch");
            }

            if (!res?.error) {
                router.refresh();
            }
        },
    });

    type valueKeys = keyof typeof values;

    const { email, password } = values;
    const error = (name: valueKeys) => {
        return errors[name] && touched[name] ? true : false;
    };
    return (
        <AuthFormContainer title="SIGN IN" onSubmit={handleSubmit}>
            <div className="flex items-center">
                <Checkbox
                    crossOrigin={undefined}
                    color="indigo"
                    onChange={() => {
                        setFieldValue("email", "biponroy5050@gmail.com");
                        setFieldValue("password", "12345678");
                    }}
                />
                <p className="text-sm">Sign in as Admin</p>
            </div>
            <Input
                crossOrigin={undefined}
                name="email"
                label="Email"
                color="blue"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error("email")}
            />
            <span className=" text-red-500"> {errors.email && touched.email && errors.email}</span>

            <Input
                crossOrigin={undefined}
                name="password"
                label="Password"
                color="blue"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error("password")}
                type="password"
            />
            <span className="text-red-500">
                {errors.password && touched.password && errors.password}
            </span>
            <div className="flex items-center justify-between">
                <p className="text-sm">Forget password?</p>
                <Link className="text-sm underline text-blue-400" href="/auth/forget_password">
                    Reset Password
                </Link>
            </div>
            <Button
                type="submit"
                color="light-blue"
                className="w-full"
                disabled={isSubmitting}
                placeholder={undefined}
            >
                Sign in
            </Button>
            <div className="flex items-center justify-between">
                <p className="text-sm">New Here?</p>
                <Link className="text-sm underline text-blue-400" href="/auth/signup">
                    Sign up
                </Link>
            </div>
        </AuthFormContainer>
    );
};

export default SignIn;
