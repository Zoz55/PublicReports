import { json } from '@sveltejs/kit';
import { sql } from "@vercel/postgres";
 import "dotenv/config";

 

export const GET = async () => {
    const { rows } = await sql`SELECT * from CAR`;
    return json({
        car: rows
    });
} 