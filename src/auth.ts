import { SessionUserProfile, SignInCredentials } from "@/types";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        user: SessionUserProfile;
    }
}
const authOptions: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, request) {
                const { email, password } = credentials as SignInCredentials;
                // send request to sign in api
                const { user, error } = await fetch("http://localhost:3000/api/users/signin", {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                }).then(async (res) => await res.json());

                if (error) {
                    return null;
                }
                return { id: user.id, ...user };
            },
        }),
    ],
    //fire callbacks after getting a sign in request
    callbacks: {
        //if user exist inside params then update the token.user
        async jwt(params) {
            if (params.user) {
                params.token = { ...params.token, ...params.user };
            }
            return params.token;
        },

        //updating session user with the user from the jwt token

        async session(params) {
            const user = params.token as typeof params.token & SessionUserProfile;
            if (user) {
                params.session.user = {
                    ...params.session.user,
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    avatar: user.avatar,
                    role: user.role,
                    verified: user.verified,
                };
            }
            return params.session;
        },
    },
};

export const {
    auth,
    handlers: { GET, POST },
} = NextAuth(authOptions);
