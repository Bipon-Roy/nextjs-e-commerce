"use client";
import FormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
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

const UpdatePassword = ({ token, userId }: Props) => {
    const router = useRouter();
    const { values, isSubmitting, touched, errors, handleSubmit, handleBlur, handleChange } =
        useFormik({
            initialValues: { password1: "", password2: "" },
            validationSchema,
            onSubmit: async (values) => {
                const res = await fetch("/api/users/update_password", {
                    method: "POST",
                    body: JSON.stringify({ password: values.password1, token, userId }),
                });
                const { message, error } = await res.json();

                if (res.ok) {
                    toast.success(message);
                    router.replace("/auth/signin");
                }

                if (!res.ok && error) {
                    toast.error(error);
                }
            },
        });

    const { password1, password2 } = values;
    type valueKeys = keyof typeof values;
    const error = (name: valueKeys) => {
        return errors[name] && touched[name] ? true : false;
    };
    return (
        <FormContainer title="Reset password" onSubmit={handleSubmit}>
            <Input
                color="blue"
                crossOrigin={undefined}
                name="password1"
                label="Password"
                value={password1}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error("password1")}
                type="password"
            />
            <span className=" text-red-500">
                {errors.password1 && touched.password1 && errors.password1}
            </span>
            <Input
                color="blue"
                crossOrigin={undefined}
                name="password2"
                label="Confirm Password"
                value={password2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error("password2")}
                type="password"
            />
            <span className=" text-red-500">
                {errors.password2 && touched.password2 && errors.password2}
            </span>
            <Button
                placeholder={undefined}
                type="submit"
                className="w-full"
                color="light-blue"
                disabled={isSubmitting}
            >
                Reset Password
            </Button>
        </FormContainer>
    );
};

export default UpdatePassword;
