import { neon } from "@neondatabase/serverless";

// Ensure this file is never sent to the client
import "server-only";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is missing.");
}

const sql = neon(DATABASE_URL);

export default sql;
