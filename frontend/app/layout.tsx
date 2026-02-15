import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Background } from "./Background";

const JostSans = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { template: "%s | Pollie", default: "Pollie" },
  description: "Pollie, Where we post the best polls!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${JostSans.className} antialiased relative`}>
        <Background />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
