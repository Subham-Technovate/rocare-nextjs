import { Archivo, DM_Sans } from 'next/font/google';
import './globals.css';
import { QuoteProvider } from './_components/QuoteProvider';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: 'RO Care Odisha – RO Repair Bhubaneswar, Cuttack & Puri',
  description:
    'Doorstep RO & water purifier repair in Bhubaneswar, Cuttack and Puri. All major brands, original parts, clear upfront pricing. Call +91 91786 02460.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${dmSans.variable}`}>
      <body>
        <QuoteProvider>{children}</QuoteProvider>
      </body>
    </html>
  );
}
