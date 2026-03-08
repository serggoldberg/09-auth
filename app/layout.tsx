import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import AppHeader from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'Note Hub',
  description: 'Generated notes on this website by GoIT by Alina Goldberg',
  openGraph: {
    title: `Note Hub`,
    description: 'Generated notes on this website by GoIT by Alina Goldberg',
    url: `https://08-zustand-nine-sand.vercel.app`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Note Hub website preview',
      },
    ],
    type: 'website',
  },
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AppHeader />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
