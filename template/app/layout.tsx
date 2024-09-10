import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CIDC Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='bg-gradient-to-r from-indigo-950 to-black'>
      <body className={`bg-transparent antialiased`}>{children}</body>
    </html>
  );
}
