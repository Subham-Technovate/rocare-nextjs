'use client';

import Image from 'next/image';

/**
 * Brand logo. Renders the logo image from /public/images/logo-ro.png.
 *
 * Props:
 *  - light  : renders on a dark background (kept for API compatibility).
 *  - width  : rendered width in px (height is derived from the 300:137 ratio).
 */
export default function Logo({ light = false, width = 132 }) {
  const height = Math.round((width * 137) / 300);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <Image
        src="/images/logo-ro.png"
        alt="RO Care Odisha"
        width={width}
        height={height}
        priority
        style={{
          height: 'auto',
          width: `${width}px`,
          objectFit: 'contain',
          borderRadius: light ? '8px' : 0,
        }}
      />
    </span>
  );
}
