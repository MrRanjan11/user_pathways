import { neon } from "@neondatabase/serverless";

const DATABASE_URL =
    "postgresql://neondb_owner:npg_9F8AJiBVZPws@ep-silent-boat-azcixdcj.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);

export default sql;
