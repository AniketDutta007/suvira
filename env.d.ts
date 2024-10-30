declare namespace NodeJS {
    export interface ProcessEnv {
        AUTH_SECRET: string;
        DATABASE_URL: string;
        PUBLIC_ROUTES: string;
        AUTH_ROUTES: string;
    }
}