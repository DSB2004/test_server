import dotenv from "dotenv";

dotenv.config()


export const JWT_SECRET = process.env.JWT_SECRET || "" as string
export const REDIS_URL = process.env.REDIS_URL || "" as string
export const PORT = process.env.PORT || 3000 as number;
