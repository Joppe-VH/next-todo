import { DATABASE_URL } from "@/env";
import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle(DATABASE_URL);
