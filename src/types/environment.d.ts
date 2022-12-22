declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_KEY: string;
            NODE_ENV: "development" | "production";
            PORT?: string;
            PWD: string;
        }
    }
}

export {};
