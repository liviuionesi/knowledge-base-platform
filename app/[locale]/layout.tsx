import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '../../i18n/routing';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { FireBirdBackground } from "@/components/layout/FireBirdBackground";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://phenix-wiki.vercel.app'),
  title: {
    default: "Phenix Wiki",
    template: "%s | Phenix Wiki"
  },
  description: "The official knowledge base for the Phenix Alliance, providing comprehensive guides on state versus state warfare, rapid growth strategies, and alliance events for Last Shelter: Survival.",
  keywords: ["Phenix Alliance", "Last Shelter Survival", "LSS Guide", "State vs State", "Doomsday", "Eden", "Alliance Duel", "Phenix Wiki"],
  authors: [{ name: "Phenix Alliance" }],
  creator: "Phenix Alliance",
  publisher: "Phenix Alliance",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Phenix Wiki",
    description: "The official knowledge base for the Phenix Alliance.",
    url: 'https://phenix-wiki.vercel.app',
    siteName: 'Phenix Wiki',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phenix Wiki',
    description: 'The official knowledge base for the Phenix Alliance.',
  },
  verification: {
    google: 'SIjR8xIhhhpELdyRKAYO0gr-l_gjpcl79ntBc6si4A8',
  },
  icons: {
    icon: '/theme/phenix-logo.png',
    apple: '/theme/phenix-logo.png',
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Await the params promise (Next.js 15+ requirement)
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <FireBirdBackground />
            {children}
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
