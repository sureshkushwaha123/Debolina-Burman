import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Debolina Burman - Fashion Designer Portfolio',
  description: 'NIFT Fashion Designer specializing in contemporary couture, sustainable fashion, and wearable art. Explore my portfolio of innovative designs.',
  keywords: 'fashion designer, NIFT, couture, sustainable fashion, portfolio, contemporary design',
  icons: {
    icon: '/photos/img1.jpg', // or '/logo.png' — put your image in the public folder
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
