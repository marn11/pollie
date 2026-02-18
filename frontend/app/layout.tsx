import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Background } from "./Background";
import { Toaster } from "react-hot-toast";

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
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "oklch(0.1 0.1 99)",
              backdropFilter: "blur(8px)",
              border: "1px solid oklch(0.4 0.2 99)",
              borderRadius: "16px",
              color: "white",
              boxShadow: "0 2px 8px -1px rgba(0,0,0,0.5)",
            },
          }}
          containerStyle={{ top: 30, right: 30 }}
        />
      </body>
    </html>
  );
}
