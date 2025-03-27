import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Revenda Herbie",
  description: "Revenda de Veículos em Pelotas",
  keywords: ["Revenda", "Veículos", "Carros", "Pelotas"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
