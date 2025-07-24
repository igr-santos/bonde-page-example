import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Ensure that the incoming `locale` is valid
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <NextIntlClientProvider>
          <Toaster richColors />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
