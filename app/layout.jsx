import Script from 'next/script';
import './globals.css';
import { QuoteProvider } from './_components/QuoteProvider';

// Fonts are self-hosted and declared via @font-face in globals.css
// (files live in app/fonts). This keeps the build fully offline and
// avoids any dependency on Google Fonts at build or runtime.

export const metadata = {
  title: 'RO Care Odisha – RO Repair Bhubaneswar, Cuttack & Puri',
  description:
    'Doorstep RO & water purifier repair in Bhubaneswar, Cuttack and Puri. All major brands, original parts, clear upfront pricing. Call +91 91786 02460.',
  icons: {
    icon: '/favicon.webp',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-57SCQ537');
          `}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57SCQ537"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <QuoteProvider>{children}</QuoteProvider>
      </body>
    </html>
  );
}
