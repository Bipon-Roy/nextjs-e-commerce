"use client";
import React from "react";
import FormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";

import Link from "next/link";

const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPassword = () => {
    const { values, isSubmitting, touched, errors, handleSubmit, handleBlur, handleChange } =
        useFormik({
            initialValues: { email: "" },
            validationSchema,
            onSubmit: async (values, actions) => {},
        });

    type valueKeys = keyof typeof values;

    const { email } = values;
    const error = (name: valueKeys) => {
        return errors[name] && touched[name] ? true : false;
    };

    return (
        <FormContainer title="Create New Account" onSubmit={handleSubmit}>
            <Input
                crossOrigin={undefined}
                name="email"
                label="Email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error("email")}
            />
            <span className=" text-red-500">{errors.email && touched.email && errors.email}</span>
            <Button
                placeholder={undefined}
                type="submit"
                className="w-full"
                disabled={isSubmitting}
            >
                Send Link
            </Button>
            <div className="flex items-center justify-between">
                <Link href="/auth/signin">Sign in</Link>
                <Link href="/auth/signup">Sign up</Link>
            </div>
        </FormContainer>
    );
};

export default ForgetPassword;
