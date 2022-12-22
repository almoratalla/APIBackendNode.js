import { config } from "dotenv";
import { join } from "path";

config();
export const isProduction = process.env.NODE_ENV === "production";
export const origin = { origin: isProduction ? false : "*" };
export const logsPath = join(__dirname, "./logs");

export default config;
