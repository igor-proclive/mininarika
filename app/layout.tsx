import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mininarika",
    template: "%s | Mininarika",
  },
  description: "Jednostavni i ukusni recepti za svaki dan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className={`${geist.variable} antialiased bg-warm text-stone-900 dark:bg-warm-dark dark:text-stone-100 min-h-screen`}>
        <LanguageProvider>
          <Header />
          <main className="max-w-5xl mx-auto px-4 py-8">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
