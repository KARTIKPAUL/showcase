import type { Metadata } from "next";
import "./globals.css"; // Import global styles if needed
import Header from "@/components/Header/Header";



export const metadata: Metadata = {
  title: "My Next.js App",
  description: "A sample Next.js app with layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
