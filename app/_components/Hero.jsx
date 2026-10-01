'use client';

import Image from 'next/image';
import { FaPhoneAlt, FaArrowRight } from 'react-icons/fa';
import { BRANDS, TEL_HREF } from '../_data/site';
import { Eyebrow } from './ui';
import HeroForm from './HeroForm';

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-section container-pad"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#0A2540',
        color: '#FFFFFF',
        padding: '72px 24px 150px',
      }}
    >
      {/* Background banner image */}
      <Image
        src="/images/banner-11.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
      />
      {/* Dark overlay for text contrast */}
      <div className="hero-overlay" aria-hidden="true" />

      <div
        className="hero-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gap: '56px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Eyebrow color="#FFB627">All major purifier brands repaired</Eyebrow>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(38px, 5.2vw, 64px)',
              lineHeight: 1.04,
              letterSpacing: '-0.01em',
            }}
          >
            Expert RO &amp; Water Purifier Repair Service
          </h1>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.65, color: '#C9D8E6', maxWidth: '540px' }}>
            RO Care Odisha fixes all major purifier brands. Get safe, clean drinking water for your
            home or business without the hassle of a broken machine.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '8px' }}>
            <a
              href={TEL_HREF}
              className="btn btn-block-mobile"
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
                fontSize: '16px',
              }}
            >
              <FaPhoneAlt size={18} aria-hidden="true" />
              <span>Book a Technician</span>
            </a>
            <a
              href="#issues"
              className="btn btn-ghost btn-block-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                minHeight: '54px',
                padding: '0 28px',
                borderRadius: '8px',
                border: '2px solid rgba(255,255,255,0.5)',
                color: '#FFFFFF',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            >
              <span>View Services</span>
              <FaArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div
            className="brands-row"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              marginTop: '12px',
              fontSize: '14px',
              color: '#9FB6CB',
            }}
          >
            <span className="brands-label">We service:</span>
            {BRANDS.map((brand) => (
              <span
                key={brand}
                style={{
                  padding: '4px 12px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  fontWeight: 500,
                }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <HeroForm />
        </div>
      </div>
    </section>
  );
}

