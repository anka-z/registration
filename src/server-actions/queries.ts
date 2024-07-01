"use server";
import { sql } from "@vercel/postgres";

export async function getData() {
  const res =
    await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
  return res.rows.map((row) => row.table_name).join(", ");
}
