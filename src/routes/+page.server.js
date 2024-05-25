import { sql } from "@vercel/postgres";
 import "dotenv/config";
 
export const load = async () => {
    const { rows } = await sql`SELECT * from CAR`;
    return {
        car: rows
    }
}

// export const actions = {
//     create: async ({ cookies, request }) => {
//         const { title, price, note } = Object.fromEntries(await request.formData());
//         await sql`INSERT INTO CART (Title, Price, Note, Status, add_date) 
//         VALUES (${title}, ${parseFloatOrZero(price)}, ${note}, 1, now())`;

//     },

    
// }