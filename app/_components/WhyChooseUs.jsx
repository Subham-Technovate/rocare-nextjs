'use client';

import Image from 'next/image';
import { FaCheck, FaPhoneAlt } from 'react-icons/fa';
import { PHONE_DISPLAY, TEL_HREF } from '../_data/site';
import { Eyebrow } from './ui';

const FEATURES = [
  'Factory-Trained Staff',
  '100% Original Parts',
  'Industrial & Home Setup',
  'Clear Upfront Pricing',
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad container-pad" style={{ padding: '104px 24px 96px' }}>
      <div
        className="why-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 4.4',
              borderRadius: '18px',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/honest-affordable-service.png"
              alt="RO Care Odisha technician providing honest, affordable water purifier service"
              fill
              sizes="(max-width: 860px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div
            className="why-badge"
            style={{
              position: 'absolute',
              right: '-12px',
              bottom: '-24px',
              background: '#0B63B6',
              color: '#FFFFFF',
              borderRadius: '14px',
              padding: '22px 26px',
              maxWidth: '220px',
              boxShadow: '0 18px 40px rgba(11,99,182,0.3)',
            }}
          >
            <div
              className="why-badge-num"
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 800,
                fontSize: '34px',
                lineHeight: 1,
              }}
            >
              100%
            </div>
            <div style={{ fontSize: '15px', marginTop: '6px' }}>
              Original, genuine spare parts. No cheap knock-offs.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <Eyebrow>Why Choose Us?</Eyebrow>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(30px, 3.6vw, 46px)',
              lineHeight: 1.1,
              color: '#0A2540',
            }}
          >
            Honest, affordable service for your water purifier
          </h2>
          <p style={{ margin: 0, fontSize: '17px' }}>
            RO Care Odisha started with a simple goal: giving people an honest, affordable way to
            service their water purifiers. Clean water is a basic need. We work hard to make sure
            every family and business in our service area has a machine that runs properly and keeps
            them healthy.
          </p>
          <div
            className="why-features"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px 24px',
              marginTop: '4px',
            }}
          >
            {FEATURES.map((feature) => (
              <div
                key={feature}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontWeight: 700,
                  color: '#0A2540',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#E6F1FB',
                    color: '#0B63B6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FaCheck size={16} strokeWidth={0} aria-hidden="true" />
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div className="why-cta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
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
                background: '#0B63B6',
                color: '#FFFFFF',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Give Us a Call
            </a>
            <a
              href={TEL_HREF}
              className="why-call-link"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: '#0A2540' }}
            >
              <span
                className="icon-pop"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '2px solid #D5E3EF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0B63B6',
                  flexShrink: 0,
                }}
              >
                <FaPhoneAlt size={20} aria-hidden="true" />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
                <span style={{ fontSize: '13px', color: '#5A6B7D' }}>Call us now</span>
                <span style={{ fontWeight: 700, fontSize: '18px' }}>{PHONE_DISPLAY}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
