'use client';

import { FaArrowRight } from 'react-icons/fa';
import { useQuote } from './QuoteProvider';

/**
 * QuoteButton — a CTA button that opens the "Get a Quote" popup.
 *
 * Props:
 *  - children : button label (default "Get a Quote")
 *  - variant  : 'solid' (amber, default) | 'blue' | 'ghost' | 'ghost-light'
 *  - style    : extra inline styles merged over the base
 *  - withArrow: show a trailing arrow icon
 */
export default function QuoteButton({
  children = 'Get a Quote',
  variant = 'solid',
  withArrow = false,
  style,
  ...rest
}) {
  const { openQuote } = useQuote();

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    minHeight: '54px',
    padding: '0 28px',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '16px',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  const variants = {
    solid: { background: '#FFB627', color: '#0A2540' },
    blue: { background: '#0B63B6', color: '#FFFFFF' },
    ghost: {
      background: 'transparent',
      color: '#FFFFFF',
      border: '2px solid rgba(255,255,255,0.5)',
    },
    'ghost-light': {
      background: 'transparent',
      color: '#0A2540',
      border: '2px solid #D5E3EF',
    },
  };

  return (
    <button
      type="button"
      onClick={openQuote}
      className={`btn${variant === 'ghost' || variant === 'ghost-light' ? ' btn-ghost' : ''}`}
      style={{ ...base, ...(variants[variant] || variants.solid), ...style }}
      {...rest}
    >
      <span>{children}</span>
      {withArrow && <FaArrowRight size={18} aria-hidden="true" />}
    </button>
  );
}
