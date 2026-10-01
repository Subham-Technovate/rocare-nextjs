'use client';

import Image from 'next/image';
import { FaPhoneAlt } from 'react-icons/fa';
import { TEL_HREF } from '../_data/site';
import { Eyebrow } from './ui';
import QuoteButton from './QuoteButton';

export default function DoorstepBand() {
  return (
    <section className="container-pad" style={{ padding: '0 24px' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '22px',
          overflow: 'hidden',
          background: '#0A2540',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        }}
      >
        <div
          className="doorstep-pad"
          style={{
            padding: 'clamp(36px, 5vw, 64px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            color: '#FFFFFF',
          }}
        >
          <Eyebrow color="#FFB627">Doorstep Care &amp; Repair Service</Eyebrow>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.2vw, 42px)',
              lineHeight: 1.12,
            }}
          >
            A broken water purifier is a major problem. We come to you.
          </h2>
          <p style={{ margin: 0, fontSize: '17px', color: '#C9D8E6' }}>
            RO Care Odisha sends mechanics directly to your location so you do not have to carry
            heavy machines to a repair shop.
          </p>
          <div className="doorstep-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '6px' }}>
            <a
              href={TEL_HREF}
              className="btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                minHeight: '54px',
                padding: '0 28px',
                borderRadius: '8px',
                background: '#FFB627',
                color: '#0A2540',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <FaPhoneAlt size={18} aria-hidden="true" />
              <span>Call Us Now</span>
            </a>
            <QuoteButton variant="ghost">Get a Quote</QuoteButton>
          </div>
        </div>

        <div style={{ minHeight: '320px', borderLeft: '2px dashed #3E6A93', boxSizing: 'border-box', position: 'relative' }}>
          <Image
            src="/images/A%20broken%20water%20purifier.png"
            alt="A broken water purifier awaiting repair"
            fill
            sizes="(max-width: 680px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
