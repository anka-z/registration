import { sql } from "@vercel/postgres";

export default function ListTables() {
  async function getData() {
    "use server";
    const res =
      await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    return res.rows.map((row) => row.table_name).join(", ");
  }

  console.log(getData());

  return <div>{getData()}</div>;
}
