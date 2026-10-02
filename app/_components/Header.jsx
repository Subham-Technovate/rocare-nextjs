'use client';

import Logo from './Logo';
import QuoteButton from './QuoteButton';

const NAV_LINKS = [
  { label: 'Issues We Fix', href: '#issues' },
  { label: 'Services', href: '#issues' },
  { label: 'How We Work', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQs', href: '#faq' },
];

export default function Header() {
  return (
    <header
      className="sticky-header"
      style={{ background: '#FFFFFF', borderBottom: '1px solid #E3ECF4' }}
    >
      <div
        className="header-inner container-pad"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px 32px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <Logo />
        </a>
        <nav
          aria-label="Main"
          className="header-nav"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px 28px',
            fontWeight: 500,
            fontSize: '15px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{ color: '#0A2540', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <QuoteButton
          style={{
            minHeight: '48px',
            padding: '0 22px',
          }}
        >
          Request a Callback
        </QuoteButton>
      </div>
    </header>
  );
}
