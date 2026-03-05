import type { Metadata } from "next";
import "@/index.css";
import RootLayoutClient from "./layout-client.tsx";

export const metadata: Metadata = {
  title: "NexWebSA",
  description: "Premium Web Solutions",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}