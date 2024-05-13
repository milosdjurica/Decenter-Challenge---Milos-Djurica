import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import RecoilRootComponent from "@/components/recoil-root";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";

const space = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Decenter R&D challenge",
  description: "Created by Milos Djurica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={space.className}>
        <RecoilRootComponent>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </RecoilRootComponent>
      </body>
    </html>
  );
}
