import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall Calendar",
  description: "Premium wall calendar interaction demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
