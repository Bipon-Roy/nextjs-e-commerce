"use client";
import React from "react";
import FormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";

import Link from "next/link";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPassword = () => {
    const { values, isSubmitting, touched, errors, handleSubmit, handleBlur, handleChange } =
        useFormik({
            initialValues: { email: "" },
            validationSchema,
            onSubmit: async (values) => {
                try {
                    const res = await fetch("/api/users/forget_password", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });

                    const { message, error } = await res.json();

                    if (res.ok) {
                        toast.success(message);
                    }

                    if (!res.ok && error) {
                        toast.error(error);
                    }
                } catch (error) {
                    alert(error);
                }
            },
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
                color="blue"
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
                color="light-blue"
            >
                Send Link
            </Button>
            <div className="flex items-center justify-between">
                <p className="text-sm">Remember Password?</p>
                <Link className="text-sm underline text-blue-400" href="/auth/signin">
                    Sign in
                </Link>
            </div>
        </FormContainer>
    );
};

export default ForgetPassword;
