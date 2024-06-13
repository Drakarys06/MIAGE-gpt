import dotenv from "dotenv";
import path from "path";

// Load .env
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

export const config = {
    API_KEY: process.env.API_KEY,
    PORT: process.env.PORT || 3001,
};
