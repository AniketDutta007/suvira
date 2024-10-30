import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
        PUBLIC_ROUTES: process.env.PUBLIC_ROUTES,
        AUTH_ROUTES: process.env.AUTH_ROUTES,
    }
};

export default nextConfig;
