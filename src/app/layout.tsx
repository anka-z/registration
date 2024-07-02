import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/bootstrap.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MNN Rejestracja",
  description: "Rejestracja na wydarzenia w ramach MNN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
