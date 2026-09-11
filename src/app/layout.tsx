import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const asimovian = localFont({
  src: "../../public/fonts/Asimovian-latin.woff2",
  variable: "--font-asimovian",
  weight: "400",
  display: "swap",
});

const kodeMono = localFont({
  src: "../../public/fonts/KodeMono-latin.woff2",
  variable: "--font-kode",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MASS — Tacoma",
  description: "MASS is a room in Tacoma built with congregation in mind.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${asimovian.variable} ${kodeMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
