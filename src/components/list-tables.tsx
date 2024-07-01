"use client";
import { getData } from "@/server-actions/queries";
import { useState, useEffect } from "react";
export default function ListTables() {
  const [tables, setTables] = useState("----");
  useEffect(() => {
    const run = async () => {
      const res = await getData();
      setTables(res);
    };
    run();
  }, []);

  return <div>{tables}</div>;
}
