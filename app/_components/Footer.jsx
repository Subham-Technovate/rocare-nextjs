'use client';

import Logo from './Logo';
import { PHONE_DISPLAY, TEL_HREF } from '../_data/site';

const ISSUES = [
  { label: 'High TDS Levels', href: '#issues' },
  { label: 'Bad Taste or Odor', href: '#issues' },
  { label: 'Slow Water Flow', href: '#issues' },
  { label: 'Water Leakage', href: '#issues' },
  { label: 'Motor & Power Problems', href: '#issues' },
];

const SERVICES = [
  { label: 'General Service & Checkup', href: '#issues' },
  { label: 'Filter Replacement', href: '#issues' },
  { label: 'Leak Repair', href: '#issues' },
  { label: 'New Installation', href: '#issues' },
];

export default function Footer() {
  return (
    <footer className="footer-pad container-pad" style={{ background: '#061A30', color: '#9FB6CB', padding: '72px 24px 28px', fontSize: '15px' }}>
      <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
          }}
        >
          <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Logo light />
            </div>
            <p style={{ margin: 0, lineHeight: 1.7 }}>
              Honest, affordable doorstep repair for home and industrial water purifiers.
            </p>
          </div>

          <div className="footer-col footer-col-issues" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ margin: '0 0 4px', fontFamily: "'Archivo', sans-serif", fontSize: '17px', color: '#FFFFFF' }}>
              Issues We Fix
            </h4>
            {ISSUES.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="footer-link"
                style={{ color: '#9FB6CB', textDecoration: 'none' }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-col footer-col-services" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ margin: '0 0 4px', fontFamily: "'Archivo', sans-serif", fontSize: '17px', color: '#FFFFFF' }}>
              Services
            </h4>
            {SERVICES.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="footer-link"
                style={{ color: '#9FB6CB', textDecoration: 'none' }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-col footer-col-contact" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ margin: '0 0 4px', fontFamily: "'Archivo', sans-serif", fontSize: '17px', color: '#FFFFFF' }}>
              Contact
            </h4>
            <a
              href={TEL_HREF}
              className="footer-link"
              style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, fontSize: '18px' }}
            >
              {PHONE_DISPLAY}
            </a>
            <span>Bhubaneswar · Cuttack · Puri</span>
            <span>Domestic &amp; industrial units</span>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{
            borderTop: '1px solid #1B3552',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '14px',
          }}
        >
          <span>© 2026 RO Care Odisha. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
