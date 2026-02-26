import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal AI Assistant Platform",
  description: "A full-stack MVP platform for personal AI assistants"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
