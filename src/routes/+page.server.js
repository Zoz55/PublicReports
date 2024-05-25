import { sql } from "@vercel/postgres";
 import "dotenv/config";
 
export const load = async (params) => {
    console.log(params)
    const { rows } = await sql`SELECT * from CAR`;
    return {
        car: rows
    }
}