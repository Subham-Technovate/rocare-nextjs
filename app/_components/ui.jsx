'use client';

import { COLORS } from '../_data/site';
import { CameraIcon } from './icons';

export function Eyebrow({ children, color = COLORS.blue, centered = false }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color,
      }}
    >
      <span style={{ width: '32px', height: '2px', background: color }} />
      <span>{children}</span>
      {centered && <span style={{ width: '32px', height: '2px', background: color }} />}
    </div>
  );
}

/**
 * PhotoPlaceholder — the dashed "photo" placeholder used throughout the
 * design. Keeps the exact visual language of the source HTML.
 *
 * variants:
 *  - dark  : navy panel (Hero, Doorstep band, Technician aside)
 *  - blue  : blue panel (CTA band)
 *  - light : pale blue panel (About photo)
 */
export function PhotoPlaceholder({
  label,
  caption,
  variant = 'dark',
  icon,
  iconSize = 44,
  style,
}) {
  const isLight = variant === 'light';
  const isBlue = variant === 'blue';

  const bg = isLight ? '#DCEAF5' : isBlue ? '#2A7BC6' : COLORS.navyPanel;
  const border = isLight ? COLORS.dashLight : isBlue ? '#8CBDEB' : COLORS.dashDark;
  const textColor = isLight ? '#24415E' : '#C9D8E6';
  const labelColor = isLight ? COLORS.navy : '#FFFFFF';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '18px',
        background: bg,
        border: `2px dashed ${border}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '32px',
        textAlign: 'center',
        color: textColor,
        ...style,
      }}
    >
      {icon ?? <CameraIcon size={iconSize} />}
      <div style={{ fontWeight: 700, fontSize: '16px', color: labelColor }}>{label}</div>
      <div style={{ fontSize: '14px', lineHeight: 1.5, maxWidth: '300px' }}>{caption}</div>
    </div>
  );
}
