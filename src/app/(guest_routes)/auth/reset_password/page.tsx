"use client";
import React from "react";
import FormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    password1: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    password2: yup
        .string()
        .oneOf([yup.ref("password1")], "Passwords must match")
        .required("Confirm password is required"),
});

interface Props {
    userId: string;
    token: string;
}
const ResetPassword = () => {
    const { values, isSubmitting, touched, errors, handleSubmit, handleBlur, handleChange } =
        useFormik({
            initialValues: { password1: "", password2: "" },
            validationSchema,
            onSubmit: async (values, actions) => {},
        });

    const { password1, password2 } = values;
    type valueKeys = keyof typeof values;
    const error = (name: valueKeys) => {
        return errors[name] && touched[name] ? true : false;
    };
    return (
        <FormContainer title="Reset password" onSubmit={handleSubmit}>
            <Input
                crossOrigin={undefined}
                name="password1"
                label="Password"
                value={password1}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error("password1")}
                type="password"
            />
            <Input
                crossOrigin={undefined}
                name="password2"
                label="Confirm Password"
                value={password2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error("password2")}
                type="password"
            />
            <Button
                placeholder={undefined}
                type="submit"
                className="w-full"
                disabled={isSubmitting}
            >
                Reset Password
            </Button>
        </FormContainer>
    );
};

export default ResetPassword;
