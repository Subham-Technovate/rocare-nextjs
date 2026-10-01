'use client';

import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { PHONE_DISPLAY, TEL_HREF } from '../_data/site';

export default function TopBar() {
  return (
    <div style={{ background: '#061A30', color: '#C9D8E6', fontSize: '14px' }}>
      <div
        className="topbar-inner"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '10px 24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px 24px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaMapMarkerAlt size={16} color="#FFB627" aria-hidden="true" />
          <span>Doorstep RO repair in Bhubaneswar · Cuttack · Puri</span>
        </div>
        <a
          href={TEL_HREF}
          className="nav-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          <FaPhoneAlt size={16} color="#FFB627" aria-hidden="true" />
          <span>Urgent Call? {PHONE_DISPLAY}</span>
        </a>
      </div>
    </div>
  );
}
