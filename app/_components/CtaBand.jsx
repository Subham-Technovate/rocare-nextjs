'use client';

import Image from 'next/image';
import { FaPhoneAlt } from 'react-icons/fa';
import { PHONE_DISPLAY, TEL_HREF } from '../_data/site';
import QuoteButton from './QuoteButton';

export default function CtaBand() {
  return (
    <section className="section-pad container-pad" style={{ padding: '96px 24px', background: '#0B63B6', color: '#FFFFFF' }}>
      <div
        className="cta-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 4vw, 50px)',
              lineHeight: 1.06,
            }}
          >
            Stop Drinking Poor Quality Water
          </h2>
          <p style={{ margin: 0, fontSize: '18px', color: '#E3EEF9', maxWidth: '520px' }}>
            Do not risk your family&rsquo;s health with a broken filter or a dirty tank. Let RO Care
            Odisha check your machine and get it running like new again.
          </p>
          <div className="cta-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '6px' }}>
            <a
              href={TEL_HREF}
              className="btn cta-call-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                minHeight: '56px',
                padding: '0 28px',
                borderRadius: '8px',
                background: '#FFB627',
                color: '#0A2540',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '17px',
              }}
            >
              <FaPhoneAlt size={18} aria-hidden="true" />
              <span className="cta-call-full">Call {PHONE_DISPLAY}</span>
              <span className="cta-call-short">Call Now</span>
            </a>
            <QuoteButton
              variant="ghost"
              style={{
                minHeight: '56px',
                padding: '0 28px',
                fontSize: '17px',
                border: '2px solid #FFFFFF',
              }}
            >
              Get a Quote
            </QuoteButton>
          </div>
        </div>

        <div style={{ width: '100%', aspectRatio: '16 / 10', position: 'relative', overflow: 'hidden', borderRadius: '18px' }}>
          <Image
            src="/images/Stop%20Drinking%20Poor%20Quality%20Water.png"
            alt="Stop drinking poor quality water"
            fill
            sizes="(max-width: 680px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
