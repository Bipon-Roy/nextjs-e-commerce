"use client";
import { Button, Input } from "@material-tailwind/react";
import AuthFormContainer from "@components/AuthFormContainer";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const SignIn = () => {
    const router = useRouter();
    const { values, isSubmitting, touched, errors, handleSubmit, handleBlur, handleChange } =
        useFormik({
            initialValues: { email: "", password: "" },
            validationSchema,
            onSubmit: async (values) => {
                const res = await signIn("credentials", {
                    ...values,
                    redirect: false,
                });

                console.log(res);
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
            <Input
                crossOrigin={undefined}
                name="email"
                label="Email"
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
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error("password")}
                type="password"
            />
            <span className="text-red-500">
                {errors.password && touched.password && errors.password}
            </span>

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
