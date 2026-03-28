import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Roboto, Open_Sans, Neuton } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PersonaProvider } from "@/lib/persona-context";
import { FontProvider } from "@/lib/font-context";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const neuton = Neuton({
  variable: "--font-neuton",
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"],
});

export const metadata: Metadata = {
  title: "AgentSpot — Your AI Work Assistant",
  description:
    "Automate repetitive tasks, build workflows, and get more done with your personal AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto.variable} ${openSans.variable} ${neuton.variable} font-sans antialiased`}
      >
        <TooltipProvider>
          <PersonaProvider>
            <FontProvider>
              {children}
            </FontProvider>
          </PersonaProvider>
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
