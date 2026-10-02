import Link from 'next/link';
import Header from '../_components/Header';
import Footer from '../_components/Footer';
import { FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';
import { PHONE_DISPLAY, TEL_HREF } from '../_data/site';

export const metadata = {
  title: 'Thank You – RO Care Odisha',
  description: 'Your request has been received. Our team will call you shortly.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: '#3D4F63',
        background: '#FFFFFF',
        fontSize: '16px',
        lineHeight: 1.6,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 24px',
          background: 'linear-gradient(180deg, #EEF5FA 0%, #FFFFFF 100%)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '560px',
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '48px 40px',
            boxShadow: '0 24px 60px rgba(6,26,48,0.14)',
            border: '1px solid #E3ECF4',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
          }}
        >
          <FaCheckCircle size={64} color='#0B63B6' aria-hidden='true' />

          <h1
            style={{
              margin: 0,
              fontFamily: "'Archivo', sans-serif",
              fontSize: '30px',
              lineHeight: 1.2,
              color: '#0A2540',
            }}
          >
            Thank you!
          </h1>

          <p style={{ margin: 0, fontSize: '17px', color: '#5A6B7D', maxWidth: '420px' }}>
            Your request has been received. Our team will call you shortly to confirm your booking.
          </p>

          <div
            style={{
              width: '100%',
              borderTop: '1px solid #E3ECF4',
              marginTop: '8px',
              paddingTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <p style={{ margin: 0, fontWeight: 700, color: '#0A2540' }}>
              Need help right away?
            </p>
            <a
              href={TEL_HREF}
              className='btn'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                minHeight: '50px',
                padding: '0 24px',
                borderRadius: '8px',
                background: '#FFB627',
                color: '#0A2540',
                fontWeight: 700,
                fontSize: '16px',
                textDecoration: 'none',
              }}
            >
              <FaPhoneAlt size={16} aria-hidden='true' />
              Call {PHONE_DISPLAY}
            </a>

            <Link
              href='/'
              style={{
                color: '#0B63B6',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '15px',
              }}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
