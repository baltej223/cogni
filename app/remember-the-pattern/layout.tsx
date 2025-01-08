import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Improve Cognitive Skills",
  description: "Improve Cognitive Skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
