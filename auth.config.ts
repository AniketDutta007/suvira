import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/form-schema/auth";
import { prisma } from "@/config/prisma";

import bcryptjs from "bcryptjs";
import { NextAuthConfig, User } from "next-auth";
import { $Enums } from "@prisma/client";
import InvalidCredentialsException from "@/exception/InvalidCredentialsException";

const publicRoutes = process.env.PUBLIC_ROUTES.split(",");
const authRoutes = process.env.AUTH_ROUTES.split(",");


export default {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials): Promise<User | null> {
                try {
                    let user = null;

                    // validate credentials
                    const parsedCredentials = signInSchema.safeParse(credentials);
                    if (!parsedCredentials.success) {
                        console.error("Invalid credentials:", parsedCredentials.error.errors);
                        return null;
                    }
                    // get user

                    user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email as string,
                        },
                    });

                    if (!user) {
                        console.log("Invalid credentials");
                        return null;
                    }

                    if (!user.password) {
                        console.log("User has no password. They probably signed up with an oauth provider.");
                        return null;
                    }

                    const isPasswordValid = await bcryptjs.compare(credentials.password as string, user.password);
                    if (!isPasswordValid) {
                        console.log("Invalid password");
                        return null;
                    }

                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { password, ...userWithoutPassword } = user;
                    userWithoutPassword.role = user.role as $Enums.Role;
                    return userWithoutPassword;
                } catch (error) {
                    console.error(error);
                    throw new InvalidCredentialsException();
                }
            },
        })
    ],
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;

            // Redirect logged-in users away from auth routes
            if (authRoutes.includes(pathname)) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/', nextUrl));
                }
                return true; // Allow access to auth pages if not logged in
            }

            // Allow access to public routes for all users
            if (publicRoutes.includes(pathname)) {
                return true;
            }

            // Allow access if the user is authenticated
            return isLoggedIn;
        },
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id as string;
                token.role = user.role as $Enums.Role;
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.role = token.role as $Enums.Role;
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/signup",
    },
} satisfies NextAuthConfig;