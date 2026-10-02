import './globals.css';
import { QuoteProvider } from './_components/QuoteProvider';

// Fonts are self-hosted and declared via @font-face in globals.css
// (files live in app/fonts). This keeps the build fully offline and
// avoids any dependency on Google Fonts at build or runtime.

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
    <html lang="en">
      <body>
        <QuoteProvider>{children}</QuoteProvider>
      </body>
    </html>
  );
}
