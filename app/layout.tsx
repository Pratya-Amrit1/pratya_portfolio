import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { poppins } from "./font";
import { LayoutShell } from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "Pratya Amrit | Portfolio",
  description: "Full Stack Developer & CS Student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
