'use client';

import { FaMapMarkerAlt, FaClock, FaIndustry } from 'react-icons/fa';

const CARDS = [
  {
    icon: <FaMapMarkerAlt size={26} aria-hidden="true" />,
    title: 'Serving Bhubaneswar, Cuttack & Puri',
    body: 'We send our team directly to your house or office to do the work.',
  },
  {
    icon: <FaClock size={26} aria-hidden="true" />,
    title: 'Same-Day Home Visits',
    body: 'No need to carry a heavy machine to a repair shop. We come to you.',
  },
  {
    icon: <FaIndustry size={26} aria-hidden="true" />,
    title: 'Domestic & Industrial Units',
    body: 'Home purifiers plus large setups for restaurants, labs and factories.',
  },
];

export default function FeatureCards() {
  return (
    <section className="container-pad" style={{ padding: '0 24px' }}>
      <div
        className="feature-overlap grid-relax"
        style={{
          maxWidth: '1200px',
          margin: '-96px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          position: 'relative',
        }}
      >
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="card-hover"
            style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '30px',
              boxShadow: '0 20px 50px rgba(10,37,64,0.12)',
              display: 'flex',
              gap: '18px',
              alignItems: 'flex-start',
            }}
          >
            <span
              className="card-icon"
              style={{
                flexShrink: 0,
                width: '54px',
                height: '54px',
                borderRadius: '12px',
                background: '#0B63B6',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {card.icon}
            </span>
            <div>
              <h3
                style={{
                  margin: '0 0 6px',
                  fontFamily: "'Archivo', sans-serif",
                  fontSize: '19px',
                  color: '#0A2540',
                }}
              >
                {card.title}
              </h3>
              <p style={{ margin: 0, fontSize: '15px' }}>{card.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
