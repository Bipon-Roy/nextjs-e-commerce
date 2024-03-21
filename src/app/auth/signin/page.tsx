"use client";
import { Button, Input } from "@material-tailwind/react";
import AuthFormContainer from "@components/AuthFormContainer";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const SignIn = () => {
    const { values, isSubmitting, touched, errors, handleSubmit, handleBlur, handleChange } =
        useFormik({
            initialValues: { email: "", password: "" },
            validationSchema,
            onSubmit: async (values, actions) => {},
        });

    type valueKeys = keyof typeof values;

    const { email, password } = values;
    const error = (name: valueKeys) => {
        return errors[name] && touched[name] ? true : false;
    };
    return (
        <AuthFormContainer title="Login in your account" onSubmit={handleSubmit}>
            <Input
                crossOrigin={undefined}
                name="email"
                label="Email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error("email")}
            />
            <Input
                crossOrigin={undefined}
                name="password"
                label="Password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error("password")}
                type="password"
            />
            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                placeholder={undefined}
            >
                Sign in
            </Button>
            <div className="flex items-center justify-between">
                <Link href="/auth/signup">Sign up</Link>
                <Link href="/auth/forget-password">Forget password</Link>
            </div>
        </AuthFormContainer>
    );
};

export default SignIn;
